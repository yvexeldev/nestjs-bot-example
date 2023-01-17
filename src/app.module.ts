import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { EchoModule } from "./echo/echo.module";
import { GreeterModule } from "./greeter/greeter.module";
import { GreeterBotName } from "./app.constants";
import { sessionMiddleware } from "./middleware/session.middleware";

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: "5778756891:AAFLBowJU0kcdIXRL6mFjIPkzgh_UwPDio4",
      include: [EchoModule],
    }),
    TelegrafModule.forRootAsync({
      botName: GreeterBotName,
      useFactory: () => ({
        token: "5984310267:AAE1gJTQMGOx-7na_49oGhqLd4SGtg9KMyY",
        middlewares: [sessionMiddleware],
        include: [GreeterModule],
      }),
    }),
    EchoModule,
    GreeterModule,
  ],
})
export class AppModule {}
