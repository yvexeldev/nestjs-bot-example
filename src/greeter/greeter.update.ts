import { Command, Ctx, Hears, Start, Update, Sender } from 'nestjs-telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { Context } from '../interfaces/context.interface';
import { HELLO_SCENE_ID } from '../app.constants';
import { UpdateType } from '../common/decorators/update-type.decorator';

@Update()
export class GreeterUpdate {
  @Start()
  onStart(): string {
    return 'Menga salom ayt';
  }

  @Hears(['hi', 'hello', 'hey', 'salom'])
  onGreetings(
    @UpdateType() updateType: TelegrafUpdateType,
    @Sender('first_name') firstName: string,
  ): string {
    return `Assalomu alaykum, ${firstName} ${updateType}`;
  }

  @Command('scene')
  async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(HELLO_SCENE_ID);
  }
}
