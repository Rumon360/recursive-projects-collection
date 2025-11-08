import { STATUS } from "./types";

export const datas = [
  {
    id: "root1",
    label: "Work Projects",
    status: STATUS.INDETERMINATE,
    children: [
      {
        id: "projectX",
        label: "Project X",
        status: STATUS.INDETERMINATE,
        children: [
          {
            id: "ux",
            label: "UX Design",
            status: STATUS.INDETERMINATE,
            children: [
              {
                id: "wireframes",
                label: "Wireframes.sketch",
                status: STATUS.CHECKED,
              },
              {
                id: "prototype",
                label: "Prototype.fig",
                status: STATUS.UNCHECKED,
              },
            ],
          },
          {
            id: "dev",
            label: "Development",
            status: STATUS.INDETERMINATE,
            children: [
              {
                id: "frontend",
                label: "Frontend",
                status: STATUS.CHECKED,
              },
              {
                id: "backend",
                label: "Backend",
                status: STATUS.UNCHECKED,
              },
            ],
          },
        ],
      },
      {
        id: "projectY",
        label: "Project Y",
        status: STATUS.UNCHECKED,
        children: [
          {
            id: "research",
            label: "Research",
            status: STATUS.UNCHECKED,
          },
        ],
      },
    ],
  },

  {
    id: "root2",
    label: "Personal",
    status: STATUS.UNCHECKED,
    children: [
      {
        id: "finance",
        label: "Finance",
        status: STATUS.UNCHECKED,
        children: [
          {
            id: "tax2025",
            label: "Tax 2025",
            status: STATUS.UNCHECKED,
          },
          {
            id: "investments",
            label: "Investments",
            status: STATUS.UNCHECKED,
          },
        ],
      },
      {
        id: "travel",
        label: "Travel Plans",
        status: STATUS.UNCHECKED,
        children: [
          {
            id: "europe",
            label: "Europe Trip",
            status: STATUS.UNCHECKED,
            children: [
              {
                id: "flights",
                label: "Flight Bookings",
                status: STATUS.UNCHECKED,
              },
              {
                id: "hotels",
                label: "Hotel Reservations",
                status: STATUS.UNCHECKED,
              },
            ],
          },
        ],
      },
    ],
  },
  // Root 3: Archived (No Children)
  {
    id: "root3",
    label: "Archived",
    status: STATUS.UNCHECKED,
    children: [],
  },
];
