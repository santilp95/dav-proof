/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { CommandModule, CommandModuleTest } from 'nestjs-command';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let commandModule: CommandModuleTest;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    commandModule = new CommandModuleTest(app.select(CommandModule));
  });

  it('test command module', async () => {
    const command = 'seed';
  

    const user = await commandModule.execute(command, null);
    expect(user.username).toBe('Foo');
  });
});
