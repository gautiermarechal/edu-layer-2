export default interface IClass {
  id: string;
  courseName: string;
  courseId: string;
  ledgerId: string;
  entryFeeUsd: number;
  milestoneFeeUsd: number;
  entryFeeSats: number;
  milestoneFeeSats: number;
  totalAmountSats: number;
  totalAmoutDollar: number;
}
