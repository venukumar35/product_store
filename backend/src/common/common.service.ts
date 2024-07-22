import { Injectable } from '@nestjs/common';
import { CommonRepository } from './common.repo';

@Injectable()
export class CommonService {
  constructor(private commonRepo: CommonRepository) {}
  async findAllProductCatogries() {
    return await this.commonRepo.findAllProductCatogries();
  }
  async findAllProductTypeByProductCatogriesId(id: number) {
    return await this.commonRepo.findAllProductTypeByProductCatogriesId(id);
  }
  async findAllProductTypeSizes(id: number) {
    return await this.commonRepo.findAllProductTypeSizes(id);
  }
  async findAllProductSeasons() {
    return await this.commonRepo.findAllProductSeasons();
  }
  async findAllSleeveType() {
    return await this.commonRepo.findAllSleeveType();
  }
  async findAllNeckType() {
    return await this.commonRepo.findAllNeckType();
  }
  async findAllBottomType() {
    return this.commonRepo.findAllBottomType();
  }
  async findAllBottomPleatsType() {
    return this.commonRepo.findAllBottomPleatsType();
  }
  async findAllTypeOfLengthBottom() {
    return this.commonRepo.findAllTypeOfLengthBottom();
  }
  async findAllKurtasLengthType() {
    return this.commonRepo.findAllKurtasLengthType();
  }
}
