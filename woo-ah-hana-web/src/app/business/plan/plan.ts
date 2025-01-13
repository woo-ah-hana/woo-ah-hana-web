export class Plan{
  private id: string;
  private communityId: string;
  private title: string;
  private startDate: string;
  private endDate: string;
  private category: string;
  private locations: string[];
  private memberIds: string[];

  constructor(
    id: string,
    communityId: string, 
    title:string, 
    startDate: string, 
    endDate: string, 
    category: string, 
    locations: string[], 
    memberIds: string[]){
    this.id = id;
    this.communityId = communityId;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.category = category;
    this.locations = locations;
    this.memberIds = memberIds;
  }

  public static create(
    id: string,
    communityId: string, 
    title:string, 
    startDate: string, 
    endDate: string, 
    category: string, 
    locations: string[], 
    memberIds: string[]
  ){
    return new Plan(
      id, communityId, title, startDate, endDate, category, locations, memberIds
    )
  }
}