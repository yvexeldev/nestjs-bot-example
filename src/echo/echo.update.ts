import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Help,
  InjectBot,
  On,
  Message,
  Start,
  Update,
  Command,
  Ctx,
  Hears,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { EchoService } from './echo.service';
import { GreeterBotName } from '../app.constants';
import { Context } from 'telegraf';
import { ReverseTextPipe } from '../common/pipes/reverse-text.pipe';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { AdminGuard } from '../common/guards/admin.guard';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class EchoUpdate {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
    private readonly echoService: EchoService,
  ) {}

  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    return `Salom, bu ${me.first_name}`;
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Menga ixtiyoriy xabar yuboring';
  }

  @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return 'Xush kelibsiz, ADMIN 🙋‍♂️';
  }

  @On('photo')
  async onPhoto(@Ctx() ctx: Context) {
    if ('photo' in ctx.message)
      await ctx.replyWithPhoto(
        String(ctx.message.photo[ctx.message.photo.length - 1].file_id),
      );
  }

  @On('video')
  async onVideo(@Ctx() ctx: Context) {
    if ('video' in ctx.message) {
      await ctx.reply(String(ctx.message.video.file_name));
    }
  }

  @On('sticker')
  async onSicker(@Ctx() ctx: Context) {
    if ('sticker' in ctx.message) await ctx.reply('👍');
  }

  @On('animation')
  async onAnimation(@Ctx() ctx: Context) {
    await ctx.reply('Animate1');
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    if ('contact' in ctx.message) {
      await ctx.reply(String(ctx.message.contact.phone_number));
      await ctx.reply(String(ctx.message.contact.first_name));
      await ctx.reply(String(ctx.message.contact.last_name));
      await ctx.reply(String(ctx.message.contact.vcard));
      await ctx.reply(String(ctx.message.contact.user_id));
    }
  }

  @On('location')
  async onLocation(@Ctx() ctx: Context) {
    if ('location' in ctx.message) {
      await ctx.reply(String(ctx.message.location.latitude));
      await ctx.reply(String(ctx.message.location.longitude));
      await ctx.reply(String(ctx.message.location.horizontal_accuracy));
    }
  }
  @On('channel_post')
  async onChannelPost(@Ctx() ctx: Context) {
    if ('channel_post' in ctx.message) {
      await ctx.reply(String(ctx.message.channel_post));
    }
  }
  @On('invoice')
  async onInvoice(@Ctx() ctx: Context) {
    if ('invoice' in ctx.message) {
      await ctx.reply(String(ctx.message.invoice.title));
    }
  }
  @On('voice')
  async onVoice(@Ctx() ctx: Context) {
    if ('voice' in ctx.message) {
      await ctx.reply(String(ctx.message.voice.duration));
    }
  }
  @On('document')
  async onDoc(@Ctx() ctx: Context) {
    if ('document' in ctx.message) {
      await ctx.reply(String(ctx.message.document.file_name));
    }
  }
  @On('venue')
  async onVenue(@Ctx() ctx: Context) {
    if ('venue' in ctx.message) {
      await ctx.reply(String(ctx.message.venue.address));
    }
  }

  @Hears('hi')
  async hears(@Ctx() ctx: Context) {
    await ctx.reply('Hey there');
  }
  // @On('text')
  // async onText(@Ctx() ctx: Context) {
  //   if ('text' in ctx.message) {
  //     await ctx.reply(ctx.message.text);
  //   }
  // }
  @On('text')
  onText(@Message('text', new ReverseTextPipe()) reversedText: string): string {
    return this.echoService.echo(reversedText);
  }
  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat.id);
    console.log(ctx.chat.type);
    if ('content' in ctx.message) console.log(ctx.message.content);
  }
}
