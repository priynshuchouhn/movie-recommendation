import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDate(dateStr: string): string {
  try {
    // Parse the input date string
    const date = new Date(dateStr);

    // Check if the date is invalid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Format the date as 'dd Month, yyyy'
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    console.log(error)
    // Calculate the date of the same day next week
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    return nextWeek.toLocaleDateString("en-US", options);
  }
}

export function truncateToOneDecimal(num: number): number {
  // Use Math.trunc to truncate the number after multiplying by 10 and then divide by 10
  return Math.trunc(num * 10) / 10;
}

