import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

function ConfettiEffect({ trigger }) {
  const { width, height } = useWindowSize();
  const [pieces, setPieces] = useState(0);

  useEffect(() => {
    if (trigger) {
      setPieces(2000); // 🎉 터질 때 조각 수
      setTimeout(() => setPieces(0), 1000); //n초 후 멈추게
    }
  }, [trigger]);

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={pieces}
      gravity={0.3} // 🎉 위로 올라가게 설정
      initialVelocityX={10} // 🎉 좌우 방향의 속도 0으로 설정
      initialVelocityY={30} // 🎉 위로 발사하는 초기 속도 설정
      confettiSource={{
        x: width / 2, // 출발 X 좌표
        y: height, // 하단에서 시작하도록 설정
        w: 0, // 화면 너비만큼 confetti가 퍼지게
        h: 0, // 높이는 0으로 설정하여 정확히 하단에서만 시작
      }}
    />
  );
}

export default ConfettiEffect;
