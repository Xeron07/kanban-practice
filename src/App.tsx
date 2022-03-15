import React, {
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import CardComponent from "./components/Card";
import { randomColorPicker } from "./Utils/cardColor";
import IItemObj from "./models/item";
import ICardObj from "./models/ICardInterface";
import StoreData, { UpdateDataToStore } from "./Utils/store";

const App = () => {
  const [cards, addCard] = useState<ICardObj[]>([]);
  const [firstTime, setFirstTime] = useState<boolean>(true);

  useEffect(() => {
    if (firstTime) {
      addCard([...StoreData()]);
      setFirstTime(false);
    }
  });

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addCard((oldList) => [
      ...oldList,
      {
        name: ``,
        id: `${uuidv4()}`,
        color: `${randomColorPicker()}`,
        itemList: [],
      },
    ]);
  };

  const onCardRemove = (id: string) => {
    let cardList = [...cards];
    cardList = cardList.filter((c) => c.id !== id);
    addCard([...cardList]);
  };

  const onNameChanged = (name: string, id: string) => {
    let cardList = [...cards];

    cardList.forEach((obj) => {
      if (obj.id === id) {
        obj.name = name;
      }
    });

    addCard([...cardList]);
  };

  const onListUpdated = (id: string, list: IItemObj[]) => {
    let cardList = [...cards];

    cardList.forEach((obj) => {
      if (obj.id === id) {
        obj.itemList = [...list];
      }
    });

    addCard([...cardList]);

    UpdateDataToStore(cards);
  };

  const handleItemDrop = (cardIndex: number, event: React.DragEvent) => {
    const previousCardIndex = parseInt(
      event.dataTransfer.getData("card-index")
    );
    const itemIndex = parseInt(event.dataTransfer.getData("item-index"));
    if (!cards[previousCardIndex].itemList[itemIndex].isLocked) {
      cards[cardIndex].itemList.unshift({
        ...cards[previousCardIndex].itemList[itemIndex],
      });
      cards[previousCardIndex].itemList = [
        ...cards[previousCardIndex].itemList.filter(
          (obj, inx) => inx !== itemIndex
        ),
      ];
      addCard([...cards]);
      UpdateDataToStore(cards);
    }
  };

  const listView = () => {
    return cards.map((o, i) => {
      return (
        <div
          key={o.id + o.name}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            handleItemDrop(i, e);
          }}>
          <CardComponent
            key={o.id}
            cardIndex={i}
            name={o.name}
            id={o.id}
            color={o.color}
            addedLists={o.itemList}
            handleNameChange={onNameChanged}
            handleUpdateItemList={onListUpdated}
            handleRemovecard={onCardRemove}
          />
        </div>
      );
    });
  };

  return (
    <div className='min-h-full bg-gray-100' style={{ height: "100vh" }}>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Custom Kanban</h1>
          <div
            className='ml-4 flex items-center md:ml-6'
            style={{ marginTop: "-25px", float: "right" }}>
            <button
              onClick={buttonHandler}
              className='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'>
              Add Card
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className='max-w-7xl mx-auto py-3 sm:px-3 lg:px-3'>
          <div className='px-2 py-2 sm:px-0'>
            <div className='grid grid-cols-5  gap-4'>{listView()}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
