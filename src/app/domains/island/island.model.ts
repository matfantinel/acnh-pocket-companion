export class Island {
  residentRepresentative: ResidentRepresentative = new ResidentRepresentative();

  name: string;
  fruit: 'Oranges' | 'Peaches' | 'Apples' | 'Pears' | 'Cherries';
  hemisphere: 'Northern' | 'Southern';
}

export class ResidentRepresentative {
  name: string;
  birthday: Date;
  title: string;
  comment: string;
}