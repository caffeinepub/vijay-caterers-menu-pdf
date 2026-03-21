export interface MenuItem {
  id: string;
  name: string;
  subCategory: string;
  course: string;
}

export interface SubCategory {
  name: string;
  items: MenuItem[];
}

export interface Course {
  name: string;
  subCategories: SubCategory[];
}

function makeItems(course: string, sub: string, names: string[]): MenuItem[] {
  return names.map((name, i) => ({
    id: `${course}-${sub}-${i}`.replace(/\s+/g, "-").toLowerCase(),
    name,
    subCategory: sub,
    course,
  }));
}

export const menuData: Course[] = [
  {
    name: "Snacks",
    subCategories: [
      {
        name: "Veg Snacks",
        items: makeItems("Snacks", "Veg Snacks", [
          "Masala Vada",
          "Dahi Vada",
          "Mix Veg Vada",
          "Babrala Vada",
          "Gare",
          "Sweet Corn Vada",
          "Ajwain Pakodi",
          "Shanghai Roll",
          "Jalapeno Poppers",
          "Makai Palak Tikka",
          "Pineapple Tikka",
          "Chilli Paneer",
        ]),
      },
      {
        name: "Chicken Snacks",
        items: makeItems("Snacks", "Chicken Snacks", [
          "Chicken 65",
          "Chicken Lollipop",
          "Chicken Kebab",
          "Tandoori Chicken",
          "Chicken Tikka",
          "Pepper Chicken",
        ]),
      },
      {
        name: "Egg Snacks",
        items: makeItems("Snacks", "Egg Snacks", [
          "Egg 65",
          "Egg Pepper Fry",
          "Egg Masala",
        ]),
      },
      {
        name: "Mutton Snacks",
        items: makeItems("Snacks", "Mutton Snacks", [
          "Mutton Chops",
          "Mutton Seekh Kebab",
          "Mutton Pepper Fry",
        ]),
      },
      {
        name: "Prawn Snacks",
        items: makeItems("Snacks", "Prawn Snacks", [
          "Prawn 65",
          "Prawn Pepper Fry",
          "Prawn Masala",
        ]),
      },
      {
        name: "Italian Snacks",
        items: makeItems("Snacks", "Italian Snacks", [
          "Pasta",
          "Pizza Bites",
          "Garlic Bread",
        ]),
      },
      {
        name: "South Indian Tiffins",
        items: makeItems("Snacks", "South Indian Tiffins", [
          "Idli",
          "Dosa",
          "Uttapam",
          "Medu Vada",
          "Pongal",
          "Upma",
        ]),
      },
    ],
  },
  {
    name: "Main Veg Course",
    subCategories: [
      {
        name: "Sweets",
        items: makeItems("Main Veg Course", "Sweets", [
          "Gulab Jamun",
          "Angoor Jamun",
          "Badam Halwa",
          "Carrot Halwa",
          "Pancharatna Halwa",
          "Jalebi",
          "Bellam Jalebi",
          "Paneer Jalebi",
          "Pineapple Jalebi",
          "Rasgulla",
          "Rasmalai",
          "Mysore Pak",
          "Motichoor Laddu",
          "Bandar Laddu",
          "Ragi Laddu",
          "Soan Papdi",
          "Double Ka Meetha",
          "Kaddu Ka Kheer",
          "Bobbatlu",
          "Chamcham",
          "Pista Katli",
          "Pootha Rekulu",
          "Palathalikalu",
          "Rava Kesari",
          "Badhusha",
          "Chakara Pongali",
          "Apricot Pudding",
          "Trifle Pudding",
          "Kakinada Khaja",
          "Sahi Tukda",
          "Sitafal Rabdi",
        ]),
      },
      {
        name: "Welcome Drinks",
        items: makeItems("Main Veg Course", "Welcome Drinks", [
          "Badam Milk Hot",
          "Badam Cold",
          "Mango Milkshake",
          "Chocolate Milkshake",
          "Litchi Milkshake",
          "Muskmelon Juice",
          "Lassi",
        ]),
      },
      {
        name: "Veg Soups",
        items: makeItems("Main Veg Course", "Veg Soups", [
          "Tomato Soup",
          "Manchow Soup",
          "Sweet Corn Soup",
          "Lemon Coriander Soup",
          "Mixed Veg Soup",
        ]),
      },
      {
        name: "Hots",
        items: makeItems("Main Veg Course", "Hots", [
          "Samosa",
          "Bread Roll",
          "Paneer Pakodi",
          "Aloo Tikki",
        ]),
      },
      {
        name: "Rotis",
        items: makeItems("Main Veg Course", "Rotis", [
          "Tandoori Roti",
          "Naan",
          "Butter Naan",
          "Garlic Naan",
          "Paratha",
          "Makai Ki Roti",
          "Methi Puri",
          "Palak Puri",
          "Poori",
          "Tawa Paratha",
        ]),
      },
      {
        name: "Kurma Curries",
        items: makeItems("Main Veg Course", "Kurma Curries", [
          "Veg Kurma",
          "Mixed Veg Kurma",
          "Paneer Kurma",
          "Navratan Kurma",
        ]),
      },
      {
        name: "Special Gravy Curries",
        items: makeItems("Main Veg Course", "Special Gravy Curries", [
          "Paneer Butter Masala",
          "Dal Makhani",
          "Veg Kolhapuri",
          "Methi Malai Paneer",
          "Palak Paneer",
          "Kadai Paneer",
          "Shahi Paneer",
        ]),
      },
      {
        name: "Special Rice Items",
        items: makeItems("Main Veg Course", "Special Rice Items", [
          "Veg Fried Rice",
          "Lemon Rice",
          "Tamarind Rice",
          "Coconut Rice",
          "Curd Rice",
          "Tomato Rice",
          "Pulao",
        ]),
      },
      {
        name: "Veg Dum Biryanis",
        items: makeItems("Main Veg Course", "Veg Dum Biryanis", [
          "Veg Dum Biryani",
          "Paneer Biryani",
          "Mushroom Biryani",
        ]),
      },
      {
        name: "Dal Items",
        items: makeItems("Main Veg Course", "Dal Items", [
          "Dal Tadka",
          "Dal Fry",
          "Dal Makhani",
          "Mixed Dal",
        ]),
      },
      {
        name: "Veg Fry Items",
        items: makeItems("Main Veg Course", "Veg Fry Items", [
          "Aloo Fry",
          "Brinjal Fry",
          "Gobi Fry",
          "Bhindi Fry",
          "Beans Fry",
        ]),
      },
      {
        name: "Semi Liquids",
        items: makeItems("Main Veg Course", "Semi Liquids", [
          "Sambhar",
          "Rasam",
          "Majjiga Pulusu",
          "Gongura Pappu",
        ]),
      },
      {
        name: "Grinding Chutneys",
        items: makeItems("Main Veg Course", "Grinding Chutneys", [
          "Coconut Chutney",
          "Tomato Chutney",
          "Peanut Chutney",
          "Gongura Chutney",
        ]),
      },
      {
        name: "Avakayalu",
        items: makeItems("Main Veg Course", "Avakayalu", [
          "Mango Pickle",
          "Mixed Pickle",
        ]),
      },
      {
        name: "Powders",
        items: makeItems("Main Veg Course", "Powders", [
          "Gun Powder",
          "Peanut Powder",
          "Sesame Powder",
        ]),
      },
      {
        name: "Curd",
        items: makeItems("Main Veg Course", "Curd", [
          "Plain Curd",
          "Raita",
          "Boondi Raita",
        ]),
      },
      {
        name: "Papad",
        items: makeItems("Main Veg Course", "Papad", [
          "Plain Papad",
          "Masala Papad",
          "Roasted Papad",
        ]),
      },
      {
        name: "Salads",
        items: makeItems("Main Veg Course", "Salads", [
          "Green Salad",
          "Fruit Salad",
          "Kachumber Salad",
          "Sprouts Salad",
        ]),
      },
    ],
  },
  {
    name: "Main Non-Veg Course",
    subCategories: [
      {
        name: "Non Veg Soups",
        items: makeItems("Main Non-Veg Course", "Non Veg Soups", [
          "Chicken Soup",
          "Mutton Soup",
          "Pepper Chicken Soup",
        ]),
      },
      {
        name: "Non Veg Biryanis",
        items: makeItems("Main Non-Veg Course", "Non Veg Biryanis", [
          "Chicken Biryani",
          "Mutton Biryani",
          "Egg Biryani",
          "Prawn Biryani",
        ]),
      },
      {
        name: "Chicken Curries",
        items: makeItems("Main Non-Veg Course", "Chicken Curries", [
          "Chicken Curry",
          "Butter Chicken",
          "Chicken Masala",
          "Pepper Chicken Curry",
          "Chicken Korma",
          "Kadai Chicken",
        ]),
      },
      {
        name: "Mutton Curries",
        items: makeItems("Main Non-Veg Course", "Mutton Curries", [
          "Mutton Curry",
          "Mutton Masala",
          "Mutton Rogan Josh",
          "Mutton Korma",
        ]),
      },
      {
        name: "Egg Items",
        items: makeItems("Main Non-Veg Course", "Egg Items", [
          "Egg Curry",
          "Egg Masala",
          "Egg Bhurji",
        ]),
      },
      {
        name: "Prawn Items",
        items: makeItems("Main Non-Veg Course", "Prawn Items", [
          "Prawn Curry",
          "Prawn Masala",
          "Prawn Biryani",
        ]),
      },
      {
        name: "Crab Items",
        items: makeItems("Main Non-Veg Course", "Crab Items", [
          "Crab Curry",
          "Crab Masala",
        ]),
      },
      {
        name: "Sea Foods",
        items: makeItems("Main Non-Veg Course", "Sea Foods", [
          "Fish Curry",
          "Fish Fry",
          "Prawn Fry",
        ]),
      },
      {
        name: "Fish Fry",
        items: makeItems("Main Non-Veg Course", "Fish Fry", [
          "Vanjaram Fry",
          "Rohu Fry",
          "Tilapia Fry",
        ]),
      },
    ],
  },
  {
    name: "Counter 1",
    subCategories: [
      {
        name: "Chat Items",
        items: makeItems("Counter 1", "Chat Items", [
          "Pani Puri",
          "Bhel Puri",
          "Sev Puri",
          "Dahi Puri",
          "Masala Puri",
        ]),
      },
      {
        name: "Chinese List",
        items: makeItems("Counter 1", "Chinese List", [
          "Veg Fried Rice",
          "Veg Noodles",
          "Manchurian",
          "Spring Rolls",
          "Veg Chowmein",
        ]),
      },
      {
        name: "Fruits",
        items: makeItems("Counter 1", "Fruits", [
          "Seasonal Fruits",
          "Fruit Salad",
          "Watermelon",
          "Mango",
        ]),
      },
      {
        name: "Ice Creams",
        items: makeItems("Counter 1", "Ice Creams", [
          "Vanilla",
          "Chocolate",
          "Strawberry",
          "Mango",
          "Butterscotch",
        ]),
      },
      {
        name: "Mocktails",
        items: makeItems("Counter 1", "Mocktails", [
          "Virgin Mojito",
          "Blue Lagoon",
          "Watermelon Cooler",
          "Lemon Mint",
        ]),
      },
    ],
  },
];
