import React, { useEffect, useState } from "react";
import "./HeroList.css";
import { useNavigate } from "react-router-dom";

const superheroes = [
  {
    nickname: "Iron Man",
    realName: "Tony Stark",
    origin:
      "A genius billionaire engineer who built a powered suit to escape captivity and became a high-tech hero.",
    superpowers: ["Powered armor", "Genius intellect", "Advanced AI systems"],
    catchPhrase: "I am Iron Man.",
  },
  {
    nickname: "Spider-Man",
    realName: "Peter Parker",
    origin:
      "Bitten by a radioactive spider, a teenager gained extraordinary abilities and learned responsibility.",
    superpowers: [
      "Wall-crawling",
      "Spider-sense",
      "Super strength",
      "Web-shooting",
    ],
    catchPhrase: "With great power comes great responsibility.",
  },
  {
    nickname: "Batman",
    realName: "Bruce Wayne",
    origin:
      "After witnessing his parents' murder, a wealthy philanthropist trained himself to fight crime.",
    superpowers: ["Peak human condition", "Martial arts", "Advanced gadgets"],
    catchPhrase: "I am the night.",
  },
  {
    nickname: "Superman",
    realName: "Clark Kent",
    origin:
      "Sent from the dying planet Krypton, he was raised on Earth and became its greatest protector.",
    superpowers: ["Super strength", "Flight", "Heat vision", "Invulnerability"],
    catchPhrase: "Truth, justice, and a better tomorrow.",
  },
  {
    nickname: "Wonder Woman",
    realName: "Diana Prince",
    origin:
      "An Amazonian warrior princess gifted by the gods to protect humanity.",
    superpowers: ["Super strength", "Combat mastery", "Divine weapons"],
    catchPhrase: "Only love can truly save the world.",
  },
  {
    nickname: "Thor",
    realName: "Thor Odinson",
    origin: "The Asgardian god of thunder banished to Earth to learn humility.",
    superpowers: ["Weather control", "Super strength", "Immortality"],
    catchPhrase: "For Asgard!",
  },
  {
    nickname: "Hulk",
    realName: "Bruce Banner",
    origin:
      "A scientist exposed to gamma radiation transforms into a powerful green giant.",
    superpowers: ["Unlimited strength", "Regeneration", "Durability"],
    catchPhrase: "Hulk smash!",
  },
  {
    nickname: "Black Panther",
    realName: "T'Challa",
    origin:
      "King of Wakanda who gains enhanced abilities from the heart-shaped herb.",
    superpowers: ["Enhanced senses", "Martial arts", "Vibranium suit"],
    catchPhrase: "Wakanda forever!",
  },
  {
    nickname: "Flash",
    realName: "Barry Allen",
    origin:
      "A forensic scientist struck by lightning gained access to the Speed Force.",
    superpowers: ["Super speed", "Time travel", "Phasing"],
    catchPhrase: "My name is Barry Allen, and I am the fastest man alive.",
  },
  {
    nickname: "Aquaman",
    realName: "Arthur Curry",
    origin:
      "Born of both human and Atlantean blood, he became ruler of the oceans.",
    superpowers: ["Underwater breathing", "Super strength", "Marine telepathy"],
    catchPhrase: "The seas answer to me.",
  },
  {
    nickname: "Doctor Strange",
    realName: "Stephen Strange",
    origin:
      "A brilliant surgeon who mastered mystic arts after a life-changing accident.",
    superpowers: ["Magic spells", "Time manipulation", "Dimensional travel"],
    catchPhrase: "We’re in the endgame now.",
  },
  {
    nickname: "Captain America",
    realName: "Steve Rogers",
    origin: "A frail man transformed into a super-soldier during World War II.",
    superpowers: ["Enhanced strength", "Peak endurance", "Shield mastery"],
    catchPhrase: "I can do this all day.",
  },
  {
    nickname: "Scarlet Witch",
    realName: "Wanda Maximoff",
    origin: "Exposed to cosmic energy, she gained reality-altering powers.",
    superpowers: ["Chaos magic", "Telekinesis", "Reality manipulation"],
    catchPhrase: "You took everything from me.",
  },
  {
    nickname: "Wolverine",
    realName: "Logan",
    origin: "A mutant with a tragic past and an indestructible skeleton.",
    superpowers: ["Regeneration", "Adamantium claws", "Enhanced senses"],
    catchPhrase: "I’m the best there is at what I do.",
  },
  {
    nickname: "Deadpool",
    realName: "Wade Wilson",
    origin: "A mercenary granted extreme healing powers through an experiment.",
    superpowers: ["Regeneration", "Combat mastery", "Breaking the fourth wall"],
    catchPhrase: "Maximum effort!",
  },
  {
    nickname: "Green Lantern",
    realName: "Hal Jordan",
    origin: "Chosen by a power ring to protect the universe using willpower.",
    superpowers: ["Energy constructs", "Flight", "Force fields"],
    catchPhrase: "In brightest day, in blackest night...",
  },
  {
    nickname: "Ant-Man",
    realName: "Scott Lang",
    origin: "A former thief who uses a suit that allows him to change size.",
    superpowers: [
      "Size manipulation",
      "Super strength (small scale)",
      "Ant control",
    ],
    catchPhrase: "I do some dumb things.",
  },
  {
    nickname: "Vision",
    realName: "Vision",
    origin: "An android created from advanced AI and cosmic energy.",
    superpowers: ["Density control", "Flight", "Energy beams"],
    catchPhrase: "A thing isn’t beautiful because it lasts.",
  },
  {
    nickname: "Star-Lord",
    realName: "Peter Quill",
    origin:
      "A space outlaw raised by cosmic thieves after being abducted from Earth.",
    superpowers: ["Expert marksmanship", "Jet boots", "Tactical leadership"],
    catchPhrase: "Legendary outlaw.",
  },
  {
    nickname: "Shazam",
    realName: "Billy Batson",
    origin: "A young boy granted the powers of ancient gods by a wizard.",
    superpowers: ["Super strength", "Flight", "Magic lightning"],
    catchPhrase: "Shazam!",
  },
];

const ITEMS_PER_PAGE = 5;

const HeroList = () => {
  const savedPage = sessionStorage.getItem("page");
  const [currentPage, setCurrentPage] = useState(savedPage);

  const navigate = useNavigate();

  useEffect(() => {
    const savedPage = sessionStorage.getItem("page");

    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("page", currentPage.toString());
  }, [currentPage]);

  const totalPages = Math.ceil(superheroes.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentHeroes = superheroes.slice(startIndex, endIndex);

  return (
    <div className="listMain">
      <div className="hero_list">
        {/* HERO LIST */}
        {currentHeroes.map((hero) => (
          <div
            className="hero"
            key={hero.nickname}
            onClick={() => navigate(`/hero/${hero.nickname}`)}
          >
            <div>
              <strong>{hero.nickname}</strong>
            </div>
            <div>{hero.superpowers.join(", ")}</div>
            <div>{hero.catchPhrase}</div>
          </div>
        ))}
      </div>
      {/* PAGINATION */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={page === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroList;
