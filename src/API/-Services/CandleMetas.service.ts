// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import ICandleMetasService from "src/Interfaces/CandleMetasService.Interface";
// import { CandleDocument } from "src/Schemas/Candle.Schema";
// import { SymbolDocument } from "src/Schemas/Symbol.Schema";

// @Injectable()
// export class CandleMetasService implements ICandleMetasService {
//     constructor(
//         @InjectModel(Symbol.name) private readonly symbolModel: Model<SymbolDocument>,
//         @InjectModel("OneHourCandles") private readonly oneHourCandleModel: Model<CandleDocument>
//     ) {


//     }

//     CalculateRSI(): Promise<any> {
//         throw new Error("Method not implemented.");
//     }
// }