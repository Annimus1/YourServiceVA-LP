// src/lib/posts.ts

const POSTS = [
  {
    "id": "1",
    "title": "Blog - YourServiceVA #1",
    "description": "Primer Post",
    "service": "Virtual Assistant",
    "Industry": "",
    "image": "https://www.yourserviceva.com/wp-content/uploads/2025/02/Why-Partnering-with-Virtual-Assistant-Companies-is-a-Game-Changer-for-Your-Business.jpg",
    "content": [
      {
        "title": "Blog - YourServiceVA",
        "description": ["Welcome to the YourServiceVA blog! Here we share insights, tips, and updates about virtual assistant services and how they can help you grow your business."],
        "image": ""
      }
    ]
  },
  {
    "id": "2",
    "title": "Blog - YourServiceVA #2",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
     "service": "Intake",
    "Industry": "",
    "image": "https://www.yourserviceva.com/wp-content/uploads/2025/02/The-Ultimate-Guide-to-Lead-Generation.jpg",
    "content": [
      {
        "title": "Blog - YourServiceVA",
        "description": ["Welcome to the YourServiceVA blog! Here we share insights, tips, and updates about virtual assistant services and how they can help you grow your business.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        ],
        "image": "https://cdn.prod.website-files.com/689d7219ed2177ef19018925/694433820505fa0b04af84b5_percent-telework-by-occupation-q1-2023-2024.avif"
      }
    ]
  },
  {
    "id": "3",
    "title": "Blog - YourServiceVA #3",
    "description": "Tercer post",
     "service": "Dialer",
    "Industry": "",
    "image": "https://www.yourserviceva.com/wp-content/uploads/2025/02/The-Ultimate-Guide-to-Lead-Generation.jpg",
    "content": [
      {
        "title": "Blog - YourServiceVA",
        "description": ["Welcome to the YourServiceVA blog! Here we share insights, tips, and updates about virtual assistant services and how they can help you grow your business."],
        "image": ""
      }
    ]
  }
];

const getPosts = () => {
  return POSTS;
}

const getPostById = (id: string) => {
  return POSTS.find(post => post.id === id);
}

export { getPosts, getPostById, POSTS }