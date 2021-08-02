import BaseController from '..';
import IEngine, { board } from './IEngine';
export default class Engine extends BaseController implements IEngine {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async nextMove(board: board): Promise<board | undefined> {
        const response = await this.client.post('/engine', JSON.stringify({ board }));
        if (response)
            return response.board;
        return;
    }

}
