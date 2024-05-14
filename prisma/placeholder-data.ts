// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
export const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
]

export const customers = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    imageUrl: "/customers/delba-de-oliveira.png",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Lee Robinson",
    email: "lee@robinson.com",
    imageUrl: "/customers/lee-robinson.png",
  },
  {
    id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
    name: "Hector Simpson",
    email: "hector@simpson.com",
    imageUrl: "/customers/hector-simpson.png",
  },
  {
    id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
    name: "Steven Tey",
    email: "steven@tey.com",
    imageUrl: "/customers/steven-tey.png",
  },
  {
    id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
    name: "Steph Dietz",
    email: "steph@dietz.com",
    imageUrl: "/customers/steph-dietz.png",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "Michael Novotny",
    email: "michael@novotny.com",
    imageUrl: "/customers/michael-novotny.png",
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    imageUrl: "/customers/evil-rabbit.png",
  },
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
    name: "Emil Kowalski",
    email: "emil@kowalski.com",
    imageUrl: "/customers/emil-kowalski.png",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    name: "Amy Burns",
    email: "amy@burns.com",
    imageUrl: "/customers/amy-burns.png",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    name: "Balazs Orban",
    email: "balazs@orban.com",
    imageUrl: "/customers/balazs-orban.png",
  },
]

export const invoices = [
  {
    id: "4ce12208-5c5b-49b1-a519-2c3b78dceb7c",
    customerId: customers[0].id,
    amount: 15795,
    status: "pending",
    date: "2022-12-06",
  },
  {
    id: "17659166-13d7-4213-8e6b-10278b16b456",
    customerId: customers[1].id,
    amount: 20348,
    status: "pending",
    date: "2022-11-14",
  },
  {
    id: "892a196c-1c9d-42fe-bc10-557c91ff286a",
    customerId: customers[4].id,
    amount: 3040,
    status: "paid",
    date: "2022-10-29",
  },
  {
    id: "2e583773-0e53-4be0-bea4-43d41553560f",
    customerId: customers[3].id,
    amount: 44800,
    status: "paid",
    date: "2023-09-10",
  },
  {
    id: "23365072-9bd3-4ecd-868c-f0bd298fa0b5",
    customerId: customers[5].id,
    amount: 34577,
    status: "pending",
    date: "2023-08-05",
  },
  {
    id: "0ab1925e-5eb6-44d2-b5d0-20cdf0191a1c",
    customerId: customers[7].id,
    amount: 54246,
    status: "pending",
    date: "2023-07-16",
  },
  {
    id: "b74d94aa-1e82-4b15-8ddf-0378ce28a08d",
    customerId: customers[6].id,
    amount: 666,
    status: "pending",
    date: "2023-06-27",
  },
  {
    id: "d9a94da5-59a1-48f8-a7a4-a36f328c4ddd",
    customerId: customers[3].id,
    amount: 32545,
    status: "paid",
    date: "2023-06-09",
  },
  {
    id: "f1d94323-f469-4556-a1fb-40ea4b1c26fa",
    customerId: customers[4].id,
    amount: 1250,
    status: "paid",
    date: "2023-06-17",
  },
  {
    id: "3c86e242-2c9b-4343-8d2f-f4f297b84489",
    customerId: customers[5].id,
    amount: 8546,
    status: "paid",
    date: "2023-06-07",
  },
  {
    id: "8f53b036-2a3e-4031-9c20-5143dd841e33",
    customerId: customers[1].id,
    amount: 500,
    status: "paid",
    date: "2023-08-19",
  },
  {
    id: "0c1f7892-1c3a-4a33-909c-354f54262e14",
    customerId: customers[5].id,
    amount: 8945,
    status: "paid",
    date: "2023-06-03",
  },
  {
    id: "fca4fccb-6a02-45b3-8a93-1cf40eb45fac",
    customerId: customers[2].id,
    amount: 8945,
    status: "paid",
    date: "2023-06-18",
  },
  {
    id: "fb93b3f0-e316-49df-bf44-d69a00d138b3",
    customerId: customers[0].id,
    amount: 8945,
    status: "paid",
    date: "2023-10-04",
  },
  {
    id: "043055ef-62c4-4cda-8ee0-3157f04ea5cf",
    customerId: customers[2].id,
    amount: 1000,
    status: "paid",
    date: "2022-06-05",
  },
]

export const revenue = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2300 },
  { month: "Jun", revenue: 3200 },
  { month: "Jul", revenue: 3500 },
  { month: "Aug", revenue: 3700 },
  { month: "Sep", revenue: 2500 },
  { month: "Oct", revenue: 2800 },
  { month: "Nov", revenue: 3000 },
  { month: "Dec", revenue: 4800 },
]
