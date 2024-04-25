export class GetAllPostsQuery {
    constructor(
      public readonly pageSize: number,
      public readonly currentPage: number
    ){}
  } 