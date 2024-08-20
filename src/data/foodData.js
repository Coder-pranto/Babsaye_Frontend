const foodItems = [
  // Main Courses (existing + additional)
  { id: 1, name: 'Pizza', price: 12, category: 'Main Course', image: 'https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg' },
  { id: 2, name: 'Burger', price: 8, category: 'Main Course', image: 'https://static.vecteezy.com/system/resources/previews/019/023/604/non_2x/front-view-tasty-meat-burger-with-cheese-and-salad-free-photo.jpg' },
  { id: 7, name: 'Pasta', price: 10, category: 'Main Course', image: 'https://savvybites.co.uk/wp-content/uploads/2023/12/Creamy-tomato-pasta-2.jpg' },
  { id: 8, name: 'Stir-Fry', price: 11, category: 'Main Course', image: 'https://www.allrecipes.com/thmb/xvlRRhK5ldXuGcXad8XDM5tTAfE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/223382_chicken-stir-fry_Rita-1x1-1-b6b835ccfc714bb6a8391a7c47a06a84.jpg' },
  { id: 9, name: 'Burrito', price: 9, category: 'Main Course', image: 'https://i0.wp.com/smittenkitchen.com/wp-content/uploads/2023/03/vegetable-burrito-10-scaled.jpg?fit=1200%2C800&ssl=1' },
  // Additional Main Courses
  { id: 25, name: 'Steak', price: 15, category: 'Main Course', image: 'https://www.howtocook.recipes/wp-content/uploads/2021/11/Steak-recipe.jpg' },
  { id: 26, name: 'Fish & Chips', price: 13, category: 'Main Course', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPaORpnSnCkQy66tr4-fO3e4anIhJTMyL-7Q&s' },
  { id: 27, name: 'Chicken Curry', price: 14, category: 'Main Course', image: 'https://www.theflavorbender.com/wp-content/uploads/2018/02/Sri-Lankan-Chicken-Curry-The-Flavor-Bender-Featured-Image-SQ-2.jpg' },
  { id: 28, name: 'Grilled Chicken', price: 12, category: 'Main Course', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToMozkkZv6pQonP3nn1BlXT2uLTWJxeshxYA&s' },
  { id: 29, name: 'Lamb Chops', price: 18, category: 'Main Course', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRyg-XTOrOndUWcFcQN8VeKrVi8pw_5_u4w&s' },

  // Appetizers (existing + additional)
  { id: 3, name: 'Salad', price: 6, category: 'Appetizer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh5d-ZLSzGRF6HDdYEyo0X6YhEd08hmo6Rdg&s' },
  { id: 4, name: 'Soup', price: 5, category: 'Appetizer', image: 'https://images.immediate.co.uk/production/volatile/sites/2/2016/08/25097.jpg?quality=90&crop=2px,151px,596px,542px&resize=556,505' },
  { id: 11, name: 'Onion Rings', price: 4, category: 'Appetizer', image: 'https://urbanblisslife.com/wp-content/uploads/2023/01/Frozen-Onion-Rings-in-Air-Fryer-FEATURE.jpg' },
  { id: 12, name: 'Mozzarella Sticks', price: 5, category: 'Appetizer', image: 'https://www.dinneratthezoo.com/wp-content/uploads/2019/12/mozzarella-sticks-4.jpg' },
  { id: 13, name: 'Nachos', price: 7, category: 'Appetizer', image: 'https://www.theslowroasteditalian.com/wp-content/uploads/2021/11/Air-Fryer-Nachos-SQUARE.jpg' },
  { id: 14, name: 'Wings', price: 8, category: 'Appetizer', image: 'https://media.istockphoto.com/id/835903320/photo/baked-chicken-wings-with-sesame-seeds-and-sweet-chili-sauce-on-white-wooden-board.jpg?s=612x612&w=0&k=20&c=SH8ZCkEKuWD_wxulpntIJ0uD4yRnUf9UXovQwSwrmmA=' },
  // Additional Appetizers
  { id: 30, name: 'Spring Rolls', price: 6, category: 'Appetizer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQveq4NgRAlXv6MUwT8XsIu5pQtTn1-QNSlbw&s' },
  { id: 31, name: 'Garlic Bread', price: 4, category: 'Appetizer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGezyZwKM_2SvPRufdZoyC_fnakbjs4F41Q&s' },
  { id: 32, name: 'Stuffed Mushrooms', price: 7, category: 'Appetizer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTIHINeoj8MpauO-F8769R2tcrg5SXilVE-g&s' },
  { id: 33, name: 'Bruschetta', price: 5, category: 'Appetizer', image: 'https://www.lifeasastrawberry.com/wp-content/uploads/2012/11/warm-bruschetta-1.jpg' },

  // Sides (additional)
  { id: 15, name: 'French Fries', price: 3, category: 'Sides', image: 'https://www.kuchpakrahahai.in/wp-content/uploads/2023/05/Air-fryer-french-fries-recipe.jpg' },
  { id: 16, name: 'Mashed Potatoes', price: 4, category: 'Sides', image: 'https://www.marthastewart.com/thmb/IgzUVbViUGURRlp6aQDB_iXAd9Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-341854-Perfect-Mashed-Potatoes-Beauty-horiz-0923-2de5512528784a42b42e57871cac1caf.jpg' },
  { id: 17, name: 'Rice', price: 2, category: 'Sides', image: 'https://www.onceuponachef.com/images/2023/12/Fried-Rice-Hero-12-760x1013.jpg' },
  { id: 18, name: 'Vegetables', price: 5, category: 'Sides', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4vbJ9J2erGuOudV0SOEXJbQKskLEP--WhsQ&s' },
  // Additional Sides
  { id: 34, name: 'Coleslaw', price: 3, category: 'Sides', image: 'https://www.inspiredtaste.net/wp-content/uploads/2015/01/Coleslaw-Recipe-1-1200.jpg' },
  { id: 35, name: 'Onion Rings', price: 4, category: 'Sides', image: 'https://urbanblisslife.com/wp-content/uploads/2023/01/Frozen-Onion-Rings-in-Air-Fryer-FEATURE.jpg' },
  { id: 36, name: 'Garlic Bread', price: 3, category: 'Sides', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGezyZwKM_2SvPRufdZoyC_fnakbjs4F41Q&s' },
  { id: 37, name: 'Side Salad', price: 4, category: 'Sides', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc6T4uWiMdGMFpnK_nIQ3yZZoT0G7-loIvEg&s' },
  { id: 38, name: 'Mac & Cheese', price: 5, category: 'Sides', image: 'https://www.browneyedbaker.com/wp-content/uploads/2023/08/crock-pot-mac-cheese-35-1200.jpg' },
  { id: 39, name: 'Baked Beans', price: 3, category: 'Sides', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL6RYzI8B9vhkNQmMDMTayZJoK9gOsSVuDwg&s' },

  // Drinks (additional)
  { id: 19, name: 'Soft Drink', price: 2, category: 'Drinks', image: 'https://media.istockphoto.com/id/533575209/photo/soft-drink-being-poured-into-glass.jpg?s=612x612&w=0&k=20&c=OPfGgxIkH_6j-ozfWol5RxypTAIZSmkR3NL-qsJ7_Qk=' },
  { id: 20, name: 'Juice', price: 3, category: 'Drinks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsR_hnSy4J8CbvI1PGrUL9G4pVEUXHY5A0vg&s' },
  { id: 21, name: 'Coffee', price: 2.5, category: 'Drinks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGtlDheJZ5eLJMAzbiblEQWf7FrOIllGV4MA&s' },
  { id: 22, name: 'Tea', price: 2, category: 'Drinks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0--MALTcwe3PJ6N2mQ1nP73cPzAd4b-6ujw&s' },
  // Additional Drinks
  { id: 40, name: 'Milkshake', price: 4, category: 'Drinks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlQsrqFvIDGcbb8nceLaQ--d4M69k9JkKfpw&s' },
  { id: 41, name: 'Lemonade', price: 3, category: 'Drinks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBarDwC-q5UOY2Z4I4afV4t3YjG1Pf2V8BQA&s' },
  { id: 42, name: 'Iced Tea', price: 2.5, category: 'Drinks', image: 'https://amandascookin.com/wp-content/uploads/2021/06/iced-tea-cocktail-RC-SQ.jpg' },
  { id: 43, name: 'Smoothie', price: 4, category: 'Drinks', image: 'https://media.istockphoto.com/id/1239923343/photo/berry-smoothie.jpg?s=612x612&w=0&k=20&c=jtSe8fc4lPU1hY7SNYUaDqa3P9zuGBhGocRaM6PmKQU=' },
  { id: 44, name: 'Hot Chocolate', price: 3, category: 'Drinks', image: 'https://joyfoodsunshine.com/wp-content/uploads/2020/11/homemade-hot-chocolate-recipe-2.jpg' },
  { id: 45, name: 'Water', price: 1, category: 'Drinks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Lrk-8DeNxETXiIBCIkRWusOQPtm_IqV_SQ&s' },

  // Desserts (existing + additional)
  { id: 23, name: 'Ice Cream', price: 4, category: 'Dessert', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN_OZi8nK407hslEX88UGGm3DXa7UdXPb4Zw&s' },
  { id: 24, name: 'Cake', price: 5, category: 'Dessert', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBnfTXs9DpaPffvPTpjsS2XrGmEqiS1PebKA&s' },
  // Additional Desserts
  { id: 46, name: 'Brownie', price: 4, category: 'Dessert', image: 'https://joyfoodsunshine.com/wp-content/uploads/2018/01/best-black-bean-brownies-recipe-4.jpg' },
  { id: 47, name: 'Cheesecake', price: 5, category: 'Dessert', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxDIBKWRQWja9b128TVshvbVDNiaN__ZvyDQ&s' },
  { id: 48, name: 'Pudding', price: 3, category: 'Dessert', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQ7vLz9JBaHYcTmFNqlCN6_qk0pGKN7-Uaw&s' },
  { id: 49, name: 'Pie', price: 5, category: 'Dessert', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpnSsYhtzFvJDkv23kYE6OFwSueS6YSq00KA&s' },
  { id: 50, name: 'Muffin', price: 3, category: 'Dessert', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpOMs9ilVQ1y-aYlxAfogW_dZ_oPNeT8bAw&s' },
  { id: 51, name: 'Cupcake', price: 4, category: 'Dessert', image: 'https://handletheheat.com/wp-content/uploads/2021/02/chocolate-cupcakes-SQUARE.png' },

  { id: 53, name: 'Pastry', price: 3, category: 'Dessert', image: 'https://ocakes.in/hyderabad/storage/app/public/images/item/item-642f5b5885a38.jpg' },
  { id: 54, name: 'Pancake', price: 4, category: 'Dessert', image: 'https://www.wholesomeyum.com/wp-content/uploads/2017/03/wholesomeyum-Low-Carb-Keto-Pancakes-Recipe-21-500x375.jpg' }
];

export default foodItems;
