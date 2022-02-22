// According to : https://github.com/crmadmin/crm/tree/master/nlp the state value would are:
//
// 0:"New" (default)
//
// 1:"Approved"
//
// 2:"Disapproved"

export class Approval {
  approved: number;
  disapproved: number;
  id: number;
  new: number;
  url: string
}

export class KeyTag {
  keyword_id: number;
  keyword_name: string;
  keyword_state: string;
  tag_id: number;
  new_tag_id: number;
  tag_name: string;
  id: number;
  display_name: string;
}

export class KeyTagState {
  count: number;
  keyword_state: string
}
