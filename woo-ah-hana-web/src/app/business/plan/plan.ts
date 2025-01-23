export class Plan {
  private id: string;
  private communityId: string;
  public title: string;
  public startDate: string;
  public endDate: string;
  public category: string;
  public locations: string[];
  public memberIds: string[];
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

  toJSON() {
    const formattedStartDate = formatDateForBackend(this.startDate);
    const formattedEndDate = formatDateForBackend(this.endDate);
    return {
      communityId: this.communityId,
      title: this.title,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      category: this.category,
      locations: this.locations,
      memberIds: this.memberIds,
    };
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

  public static update(
    updatedFields: Partial<
      Pick<
        Plan,
        | "title"
        | "startDate"
        | "endDate"
        | "category"
        | "locations"
        | "memberIds"
      >
    >
  ) {
    Object.assign(this, updatedFields);
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

const formatDateForBackend = (date: string) => {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const padZero = (num: number) => String(num).padStart(2, "0");

  const year = d.getFullYear();
  const month = padZero(d.getMonth() + 1);
  const day = padZero(d.getDate());
  const hours = padZero(d.getHours());
  const minutes = padZero(d.getMinutes());
  const seconds = padZero(d.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
