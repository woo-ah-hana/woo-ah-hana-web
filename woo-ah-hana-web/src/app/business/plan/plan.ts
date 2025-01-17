export class Plan {
  private id: string;
  private communityId: string;
  private title: string;
  private startDate: string;
  private endDate: string;
  private category: string;
  private locations: string[];
  private memberIds: string[];
  private memberNames: string[];

  constructor(
    id: string,
    communityId: string,
    title: string,
    startDate: string,
    endDate: string,
    category: string,
    locations: string[],
    memberIds: string[],
    memberNames: string[]
  ) {
    this.id = id;
    this.communityId = communityId;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.category = category;
    this.locations = locations;
    this.memberIds = memberIds;
    this.memberNames = memberNames;
  }

  public static create(
    id: string,
    communityId: string,
    title: string,
    startDate: string,
    endDate: string,
    category: string,
    locations: string[],
    memberIds: string[],
    memberNames: string[]
  ) {
    return new Plan(
      id,
      communityId,
      title,
      startDate,
      endDate,
      category,
      locations,
      memberIds,
      memberNames
    );
  }

  public getId() {
    return this.id;
  }
  public getCommunityId() {
    return this.communityId;
  }
  public getTitle() {
    return this.title;
  }
  public getStartDate() {
    return this.startDate;
  }
  public getEndDate() {
    return this.endDate;
  }
  public getCategory() {
    return this.category;
  }
  public getLocations() {
    return this.locations;
  }
  public getMemberIds() {
    return this.memberIds;
  }
  public getMemberNames() {
    return this.memberNames;
  }
}
