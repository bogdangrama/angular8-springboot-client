export class ProfileResponse {
  public profileItem: ProfileItem[];
  public productProfileItem: ProductProfileItem[];
}

class ProfileItem {
  public index: string;
  public key: string;
  public value: string;
}

class ProductProfileItem {
  public index: string;
  public key: string;
  public value: string;
  public productID: string;
}
