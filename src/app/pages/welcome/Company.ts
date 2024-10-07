export interface CompanyResponse {
  data: Company[]
  draw: number
  recordsTotal: number
  recordsFiltered: number
}

export interface Company {
  DuyuruTarihi: string
  FirmaAdi: string
  Marka: string
  UrunAdi: string
  Uygunsuzluk: string
  PartiSeriNo: string
  FirmaIl: string
  FirmaIlce: string
  UrunGrupAdi: string
}
