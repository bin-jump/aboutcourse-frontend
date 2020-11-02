import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import './Style.less';

export default function Score(props) {
  const { value, size, onScoreChange } = { ...props };
  const val = value || 0;
  const sz = size || 'large';

  const clickStar = (i) => {
    if (!onScoreChange) {
      return;
    }
    let tmp = i * 2;
    let diff = value - tmp;
    if (diff >= 0) {
      diff = (diff + 1) % 3;
    } else {
      diff = 2;
    }
    onScoreChange(tmp + diff);
  };

  const resolveStar = (i) => {
    //i += 1;
    if (i * 2 + 1 === val) {
      return <StarHalfIcon fontSize={sz} onClick={(e) => clickStar(i)} />;
    }
    if (i * 2 < val) {
      return <StarIcon fontSize={sz} onClick={(e) => clickStar(i)} />;
    }
    return <StarBorderIcon fontSize={sz} onClick={(e) => clickStar(i)} />;
  };

  return (
    <div className="lecture-star">
      {[...Array(5).keys()].map((item, i) => (
        <>{resolveStar(i)}</>
      ))}
    </div>
  );
}
