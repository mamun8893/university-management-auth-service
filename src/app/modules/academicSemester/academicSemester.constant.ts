import {
  IAcademicSemesterCodes,
  IAcademicSemesterTitles,
  iAcademicSemesterMonth,
} from './academicSemester.interface'

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Spring',
  'Summer',
]
export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
]

export const academicSemesterMonth: iAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitleCodeMapper = {
  Autumn: '01',
  Spring: '02',
  Summer: '03',
}

export const academicSemesterSearchableFields = ['title', 'code']
export const academicSemesterFilterFields = [
  'searchTerm',
  'title',
  'code',
  'year',
]
