import React, { useEffect, useMemo, useReducer, useRef, useState} from 'react';

export default function useFirstMountSkip() {
  // это аналог useLayoutEffect для уверенности, что DOM элемент уже отрендерился (в первой части презентации
  // мы получали ошибку при попытке сразу вытащить CSS проперти с рефки.
  const [didMount, setDidMount] = useState(false);
  useEffect(() => setDidMount(true), []);
  return didMount;
}