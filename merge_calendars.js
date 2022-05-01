function getCrossFreeTimes(calendar1, calendar2, meetTime) {
  const result = [];
  const count = Math.max(calendar1[0].length, calendar2[0].length);
  let marker = Math.max(getValue(calendar1[1][0]), getValue(calendar2[1][0]));
  const max = Math.min(getValue(calendar1[1][1]), getValue(calendar2[1][1]));
  let finish = false;

  function getValue(str) {
    return new Date(`2000-01-01 ${str}`).valueOf();
  }

  function getTime(value) {
    const date = new Date(value);
    return `${date.getHours()}:${date.getMinutes() || '00'}`;
  }

  function addTime(val1,val2) {
    if ((val2 - val1) >= meetTime*60000) {
      result.push([getTime(val1),getTime(val2)]);
    }
  }

  for (let i = 0; i < count; i++) {
    if (finish) {
      return;
    }

    let meet1 = calendar1[0][i];
    let meet2 = calendar2[0][i];

    if (!meet1) {
      meet1 = meet2;
    }

    if (!meet2) {
      meet2 = meet1;
    }

    const leftMax = Math.max(getValue(meet1[0]), getValue(meet2[0]));
    const leftMin = Math.min(getValue(meet1[0]), getValue(meet2[0]));
    const rightMax = Math.max(getValue(meet1[1]), getValue(meet2[1]));
    const rightMin = Math.min(getValue(meet1[1]), getValue(meet2[1]));

    if (leftMin > marker) {
      addTime(marker,leftMin);
    }

    if (rightMin < leftMax) {
      addTime(rightMin,leftMax);
    }

    if (rightMax < max) {
      marker = rightMax;
      if (i+1 === count) {
        addTime(rightMax,max);
      }
    }

    if (rightMax >= max) {
     finish = true;
    }
  }

  return result;
}

getCrossFreeTimes(
  [
    [['9:00','10:30'],['12:00','13:00'],['16:00','18:00']],
    ['9:00','20:00']
  ],
  [
    [['10:00','11:30'],['12:30','14:30'],['14:30','15:00'],['16:00','17:00']],
    ['10:00','18:30']
  ],
  30
)
