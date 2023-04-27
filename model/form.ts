export interface Form {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  profile: Image;
}

export interface Image {
  publicId: string;
  fileName: string;
}
