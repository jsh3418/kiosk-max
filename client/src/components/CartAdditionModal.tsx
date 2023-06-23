import { useState } from "react";
import style from "./CartAdditionModal.module.css";
import MenuItem from "./MenuItem";
import OptionButton from "./OptionButton";

interface CartAdditionModalProps {
  menu: Menu | null;
  handleBackdropClick: () => void;
}

enum Size {
  UNCHECKED,
  BIG,
  SMALL,
}

enum Temperature {
  UNCHECKED,
  HOT,
  ICE,
}

export default function CartAdditionModal({ menu, handleBackdropClick }: CartAdditionModalProps) {
  const [size, setSize] = useState<Size>(Size.UNCHECKED);
  const [temperature, setTemperature] = useState<Temperature>(Temperature.UNCHECKED);
  const [quantity, setQuantity] = useState(1);

  const handlePlusButtonClick = () => {
    setQuantity((q) => q + 1);
  };

  const handleMinusButtonClick = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <div className={style.ModalContainer}>
      <div className={style.Backdrop} onClick={handleBackdropClick}></div>
      <div className={style.Modal}>
        <div className={style.MenuInfo}>
          <div className={style.MenuItemWrapper}>{menu && <MenuItem menu={menu} />}</div>
          <div className={style.MenuItemOptions}>
            <div className={style.MenuItemOption}>
              <OptionButton
                type={"Size"}
                text="큰거"
                isSelected={size === Size.BIG}
                onClick={() => setSize(Size.BIG)}
              />
              <OptionButton
                type={"Size"}
                text="작은거"
                isSelected={size === Size.SMALL}
                onClick={() => setSize(Size.SMALL)}
              />
            </div>
            <div className={style.MenuItemOption}>
              <OptionButton
                type={"Temperature"}
                text="뜨거운것"
                isSelected={temperature === Temperature.HOT}
                onClick={() => setTemperature(Temperature.HOT)}
              />
              <OptionButton
                type={"Temperature"}
                text="차가운것"
                isSelected={temperature === Temperature.ICE}
                onClick={() => setTemperature(Temperature.ICE)}
              />
            </div>
            <div className={style.MenuItemOption}>
              <QuantityCounter
                quantity={quantity}
                handlePlusButtonClick={handlePlusButtonClick}
                handleMinusButtonClick={handleMinusButtonClick}
              />
            </div>
          </div>
        </div>
        {/* Add menu button */}
      </div>
    </div>
  );
}

interface QuantityCounterProps {
  quantity: number;
  handlePlusButtonClick: () => void;
  handleMinusButtonClick: () => void;
}

function QuantityCounter({ quantity, handlePlusButtonClick, handleMinusButtonClick }: QuantityCounterProps) {
  return (
    <>
      <button className={style.CounterController} onClick={handleMinusButtonClick}>
        -
      </button>
      <span className={style.Counter}>{quantity}</span>
      <button className={style.CounterController} onClick={handlePlusButtonClick}>
        +
      </button>
    </>
  );
}