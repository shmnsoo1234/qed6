// 숫자 워들 (1,2,3,4,5가 각각 한 번씩 등장, 5자리, 최대 6번 시도)

/* ---------- 유틸 함수 ---------- */

// 1~5를 모두 포함하는 랜덤 순열 생성 (정답)
function generateSecret() {
  const numbers = [1, 2, 3, 4, 5];
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers; // 예: [3,1,5,2,4]
}

// 입력을 숫자 배열로 변환
function normalizeGuess(guess) {
  if (typeof guess === 'string') {
    return guess.split('').map(Number);
  } else if (Array.isArray(guess)) {
    return guess.map(Number);
  } else {
    throw new Error('guess는 문자열("12345") 또는 배열([1,2,3,4,5]) 이어야 합니다.');
  }
}

// 입력 검증
function validateGuess(guess) {
  const arr = normalizeGuess(guess);
  if (arr.length !== 5) return { ok: false, reason: '길이는 5여야 합니다.' };

  const set = new Set(arr);
  if (set.size !== 5) return { ok: false, reason: '숫자는 중복되면 안 됩니다.' };

  const validNums = [1, 2, 3, 4, 5];
  for (const n of arr) {
    if (!validNums.includes(n)) {
      return { ok: false, reason: '각 숫자는 1~5 중 하나여야 합니다.' };
    }
  }

  return { ok: true, arr };
}

// 정답 비교 (위치 무관)
function evaluateGuess(secret, guessArr) {
  const sSet = new Set(secret);
  let matches = 0;
  for (const n of guessArr) {
    if (sSet.has(n)) matches++;
  }
  return matches;
}

/* ---------- 메인 게임 ---------- */

function playNumberWordle() {
  const secret = generateSecret();
  console.log(' 미니게임 시작 (1~5가 모두 한 번씩 등장)');
  console.log('최대 6번 시도 가능!');
  console.log('(정답 디버그용):', secret.join('')); // 테스트용 출력

  const maxAttempts = 6;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const input = prompt(`(${attempts + 1}/${maxAttempts}) 5자리 숫자 입력 (1~5, 중복없음):`);
    if (input === null) {
      console.log('게임이 취소되었습니다.');
      return;
    }

    const validation = validateGuess(input);
    if (!validation.ok) {
      console.log(' 잘못된 입력:', validation.reason);
      continue;
    }

    attempts++;
    const guessArr = validation.arr;
    const matched = evaluateGuess(secret, guessArr);

    if (matched === 5) {
      console.log(` 정답입니다 (시도횟수:${attempts})`);
      return;
    } else {
      console.log(` ${matched}개 숫자가 정답에 포함되어 있습니다. (${maxAttempts - attempts}번 남음)`);
    }
  }

  console.log(` 실패 (정답: ${secret.join('')})`);
}

// 브라우저 콘솔에서 실행
playNumberWordle();
