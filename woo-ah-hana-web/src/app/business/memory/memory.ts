export class Memory {
  private id: string;
  private memberName: string;
  private imageUrl: string;
  private description: string;
  private createdAt: string;

  constructor(
    id: string,
    memberName: string,
    imageUrl: string,
    description: string,
    createdAt: string
  ) {
    this.id = id;
    this.memberName = memberName;
    this.imageUrl = imageUrl;
    this.description = description;
    this.createdAt = createdAt;
  }

  public static create(
    id: string,
    memberId: string,
    imageUrl: string,
    description: string,
    createdAt: string
  ) {
    return new Memory(id, memberId, imageUrl, description, createdAt);
  }

  public getId() {
    return this.id;
  }
  public getMemberId() {
    return this.memberName;
  }
  public getImageUrl() {
    return this.imageUrl;
  }
  public getDescription() {
    return this.description;
  }
  public getCreatedAt() {
    return this.createdAt;
  }
}
