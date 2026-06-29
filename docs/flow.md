## COMPLETE HR SYSTEM DOCUMENTATION
# Hospital Management System
📋 TABLE OF CONTENTS
Employee Lifecycle

- Departments & Job Titles

- Salary & Payroll

- Government Deductions (SSS, PhilHealth, Pag-IBIG)

- Attendance & Time Tracking

- Leave Management

- Loan Management

- Employee Schedules

- Payslip Generation

- Database Schema

- Migration Commands

1️⃣ EMPLOYEE LIFECYCLE

Hired → Probationary (6 months) → Regular → (Resigned/Terminated/Retired)
Employment Statuses:

probationary - New hire (6 months)

regular - Passed probation

contractual - Fixed-term contract

resigned - Voluntary resignation

terminated - Involuntary termination

retired - Retirement age

on_leave - On leave

suspended - Temporary suspension

deceased - Passed away

active - Currently employed

2️⃣ DEPARTMENTS & JOB TITLES
Departments:

HR

IT

Finance

Nursing

Medical

Administration

Maintenance

Pharmacy

Laboratory

Radiology

Job Titles (Examples):

Nurse

Doctor

IT Staff

HR Officer

Accountant

Admin Staff

Pharmacist

Lab Technician

Radiologic Technologist

3️⃣ SALARY & PAYROLL
Payroll Frequency
Type	Frequency	Pay Dates
Monthly	Once a month	30th of each month
Semi-Monthly	Twice a month	15th and 30th
Salary Computation

Gross Pay = Basic Salary + Allowance + Overtime Pay + Holiday Pay + Bonus
Net Pay = Gross Pay - Total Deductions
Payroll Periods
Period	Start Date	End Date	Pay Date
1st Half	1st of month	15th of month	15th
2nd Half	16th of month	Last day of month	30th/31st
4️⃣ GOVERNMENT DEDUCTIONS
SSS (Social Security System)
Salary Bracket	Employee Share	Employer Share
₱10,000 - ₱14,999	4.5%	8.5%
₱15,000 - ₱19,999	4.5%	8.5%
₱20,000 - ₱24,999	4.5%	8.5%
₱25,000 - ₱29,999	4.5%	8.5%
Example:


Salary: ₱25,000
Employee SSS: ₱1,125 (4.5%)
Employer SSS: ₱2,125 (8.5%)
PhilHealth
Rate	Employee Share	Employer Share
3% of Monthly Salary	1.5%	1.5%
Example:


Salary: ₱25,000
Total PhilHealth: ₱750 (3%)
Employee: ₱375 (1.5%)
Employer: ₱375 (1.5%)
Pag-IBIG
Type	Employee Share	Employer Share
Regular	₱100 - ₱200	₱100 - ₱200
Example:


Employee Pag-IBIG: ₱100
Employer Pag-IBIG: ₱100
Total Fixed Deductions (Monthly)

Employee Share:
SSS: ₱1,125
PhilHealth: ₱375
Pag-IBIG: ₱100
Total: ₱1,600/month
5️⃣ ATTENDANCE & TIME TRACKING
Attendance Statuses
Status	Condition
present	Time In before 8:00 AM, Time Out after 5:00 PM
late	Time In after 8:00 AM
absent	No Time In recorded
on_leave	Approved leave
half_day	Time In at 8:00 AM, Time Out at 12:00 PM
under_time	Left before 5:00 PM
overtime	Time Out after 6:00 PM
holiday	Worked on a holiday
weekend	Worked on a weekend
Attendance Deductions
Type	Rate
Late	₱104/hour (₱833/day ÷ 8 hours)
Absent	1 day salary (₱833/day)
Under_time	₱104/hour
Overtime	₱104 × 1.25 = ₱130/hour
Formula

Total Hours = Time Out - Time In
Overtime Hours = Total Hours - 8 (if > 8)
Late Minutes = Time In - 8:00 AM (if after 8:00 AM)
Example

Employee worked 20 days (out of 22 working days)
- 2 days absent: ₱833 × 2 = ₱1,666 deduction
- 1 hour late: ₱104 deduction
- 2 hours overtime: ₱104 × 1.25 × 2 = ₱260 addition

Net Pay = Basic Salary + Overtime - (Absent + Late)
       = 25,000 + 260 - (1,666 + 104)
       = 25,000 + 260 - 1,770
       = ₱23,490
6️⃣ LEAVE MANAGEMENT
Leave Types
Leave Type	Credits/Year	Paid?	Notes
Vacation Leave (VL)	15 days	✅ Yes	Accrues 1.25 days/month
Sick Leave (SL)	15 days	✅ Yes	Accrues 1.25 days/month
Special Leave	3 days	✅ Yes	For solo parents
Maternity Leave	105 days	✅ Yes	One-time per pregnancy
Paternity Leave	7 days	✅ Yes	One-time per pregnancy
Leave Without Pay (LWOP)	N/A	❌ No	No salary deduction
Leave Accrual

Per Month = 1.25 days (for VL and SL)
Per Year = 15 days
Example:


Employee starts: Jan 1, 2026
After 1 month (Feb 1): 1.25 VL, 1.25 SL
After 12 months (Jan 1, 2027): 15 VL, 15 SL
Leave Statuses
Status	Description
pending	Awaiting approval
recommended	Recommended by supervisor
approved	Approved by HR
disapproved	Rejected
cancelled	Cancelled by employee
taken	Leave already taken
Leave Request Flow

Employee requests → Pending → Supervisor recommends → HR approves → Leave taken
                                ↓
                          If disapproved → Reason provided
7️⃣ LOAN MANAGEMENT
Loan Types
Loan Type	Deduction Amount	Monthly Payment	Status
SSS Salary Loan	Fixed	Monthly	Active/Paid
Pag-IBIG Loan	Fixed	Monthly	Active/Paid
Cash Advance	Fixed	Monthly	Active/Paid
Hospital Loan	Fixed	Monthly	Active/Paid
Loan Deduction

Monthly Salary = ₱25,000
SSS Loan Deduction = ₱1,000
Pag-IBIG Loan Deduction = ₱500
Total Loan Deductions = ₱1,500

Net Pay = Gross Pay - Total Deductions - Loan Deductions
       = ₱23,490 - ₱1,500
       = ₱21,990
8️⃣ EMPLOYEE SCHEDULES
Shift Types
Shift	Time In	Time Out	Type
Morning	6:00 AM	2:00 PM	Day
Mid	2:00 PM	10:00 PM	Mid
Night	10:00 PM	6:00 AM	Night
Flexible	Variable	Variable	Flexible
Schedule Coverage

Employee A leaves (resigned)
Employee B covers Employee A's schedule

employee_schedules:
- employee_id: Employee B
- shift_id: Morning Shift
- effective_date: date coverage starts
- is_current: true
9️⃣ PAYSLIP GENERATION
Payslip Template

+----------------------------------+
|           MINIHRIS HOSPITAL       |
|         Employee Payslip          |
+----------------------------------+
| Employee: Juan Dela Cruz          |
| Employee ID: EMP-001              |
| Position: Nurse                   |
| Department: Nursing               |
| Pay Period: June 1-15, 2026      |
+----------------------------------+
| EARNINGS:                         |
|   Basic Salary      ₱12,500.00   |
|   Overtime Pay         ₱260.00   |
|   Allowance           ₱500.00    |
|   Gross Pay         ₱13,260.00   |
+----------------------------------+
| DEDUCTIONS:                       |
|   SSS                ₱562.50     |
|   PhilHealth         ₱187.50     |
|   Pag-IBIG           ₱50.00      |
|   Late               ₱104.00     |
|   Absent             ₱833.00     |
|   Loan Deduction     ₱500.00     |
|   Total Deductions   ₱2,237.00   |
+----------------------------------+
| NET PAY              ₱11,023.00  |
+----------------------------------+