import { useRef, useState } from "react";
import TabItem from "./TabItem";
import styles from "./CategoryTab.module.css";

type CategoryTabProps = {
  categories: string[];
  currentCategoryIndex: number;
  handleCategoryChange: (index: number) => void;
};

export default function CategoryTab({
  categories,
  currentCategoryIndex,
  handleCategoryChange,
}: CategoryTabProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const tabContainerRef = useRef<HTMLUListElement>(null);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    isDraggingRef.current = true;
    startXRef.current = event.pageX - scrollPosition;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (!isDraggingRef.current) {
      return;
    }

    const { scrollWidth, clientWidth } = tabContainerRef.current!;
    const maxScrollPosition = scrollWidth - clientWidth;
    const newPosition = event.pageX - startXRef.current;

    const isPassedLeftEdge = newPosition > 0;
    const isPassedRightEdge = newPosition < -maxScrollPosition;

    if (isPassedLeftEdge) {
      setScrollPosition(0);
      return;
    }

    if (isPassedRightEdge) {
      setScrollPosition(-maxScrollPosition);
      return;
    }

    setScrollPosition(newPosition);
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  const scrollableStyle = {
    transform: `translateX(${scrollPosition}px)`,
  };

  return (
    <nav
      className={styles.Tab}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ul
        className={styles.TabContainer}
        style={scrollableStyle}
        ref={tabContainerRef}
      >
        {categories.map((category, index) => {
          const isCurrentCategory = index === currentCategoryIndex;

          return (
            <TabItem
              key={category}
              name={category}
              isCurrentCategory={isCurrentCategory}
              handleCategoryChange={() => {
                handleCategoryChange(index);
              }}
            />
          );
        })}
      </ul>
    </nav>
  );
}
