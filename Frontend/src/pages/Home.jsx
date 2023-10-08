// App.js
import React from "react";
import Card from "../components/Card"; // Ensure the correct case for 'Card'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const App = () => {
  const cards = [
    {
      imageUrl: "https://via.placeholder.com/150",
      title: "Card 1",
      description: "Description for Card 1",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      title: "Card 2",
      description: "Description for Card 2",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      title: "Card 3",
      description: "Description for Card 3",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      title: "Card 4",
      description: "Description for Card 4",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      title: "Card 5",
      description: "Description for Card 5",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      title: "Card 6",
      description: "Description for Card 6",
    },
  ];

  // Function to split cards into rows
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Split the cards into rows of 3
  const cardRows = chunkArray(cards, 3);

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {cardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4">
            {row.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
