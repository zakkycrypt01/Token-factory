import { toNano } from '@ton/core';
import { TokenFactory } from '../wrappers/TokenFactory';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tokenFactory = provider.open(
        TokenFactory.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('TokenFactory')
        )
    );

    await tokenFactory.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(tokenFactory.address);

    console.log('ID', await tokenFactory.getID());
}
