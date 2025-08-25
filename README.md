# min-bounding-rectangle
Minimum bounding rectangle implementation in JavaScript. Uses `concaveman` and `mathjs` as dependencies.

## Usage
Install the package using npm:
```bash
npm install min-bounding-rectangle
```

Then include it in your code:
```typescript
import { findMinBoundingRect } from 'min-bounding-rectangle';

const polygon: [number, number][] = [
	[19.80727834535795, 8.054097724699727],
	[-2.8950160732760617, 11.649787920277921],
	[-18.479887926072045, 0.32671572570794183],
	[-11.42646489856237, -9.381488206791426],
	[3.5695056360146613, 1.5137221352940706],
	[18.399368159995873, -0.8350973406565108],
	[19.80727834535795, 8.054097724699727],
];

const minBoundingRect = findMinBoundingRect(polygon);
console.log(minBoundingRect);
/*
 [
  [22.054319881502234, 0.21220437083359123],
  [-15.373951326127528, -10.51261376102147],
  [-20.29571780919643, 6.663734451520373],
  [17.132553398433334, 17.388552583375432],
  [22.054319881502234, 0.21220437083359123]
 ]
*/
```
