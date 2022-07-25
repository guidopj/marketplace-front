const example = [	[5, 3, 0, 0, 7, 0, 0, 0, 0],
					[6, 0, 0, 1, 9, 5, 0, 0, 0],
					[0, 9, 8, 0, 0, 0, 0, 6, 0],
					[8, 0, 0, 0, 6, 0, 0, 0, 3],
					[4, 0, 0, 8, 0, 3, 0, 0, 1],
					[7, 0, 0, 0, 2, 0, 0, 0, 6],
					[0, 6, 0, 0, 0, 0, 2, 8, 0],
					[0, 0, 0, 4, 1, 9, 0, 5, 5],
					[0, 0, 0, 0, 8, 0, 0, 7, 9]
				]
				
const example2 = [	[5, 3, 0, 0, 7, 0],
					[6, 0, 0, 1, 9, 5],
					[0, 9, 8, 0, 0, 0],
					[8, 0, 0, 0, 6, 0],
					[4, 0, 0, 8, 0, 3],
					[7, 0, 0, 0, 2, 0]
				]
				
const resolved = [	[5, 3, 4, 6, 7, 8, 9, 1, 2],
					[6, 7, 2, 1, 9, 5, 3, 4, 8],
					[1, 9, 8, 3, 4, 2, 5, 6, 7],
					[8, 5, 9, 7, 6, 1, 4, 2, 3],
					[4, 2, 6, 8, 5, 3, 7, 9, 1],
					[7, 1, 3, 9, 2, 4, 8, 5, 6],
					[9, 6, 1, 5, 3, 7, 2, 8, 4],
					[2, 8, 7, 4, 1, 9, 6, 3, 5],
					[3, 4, 5, 2, 8, 6, 1, 7, 9]
				]

const possibleNumbers = Array.from(Array(9), (_, i) => i+1)

function sudokuResolved(sudoku){
	isResolved = true
	sudoku.forEach(elem => 
		isResolved = isResolved && elem.every(value => value > 0)
	)
	return isResolved
}

function findNextFreePosition(partialSudoku){
	for(let idxR = 0; idxR < partialSudoku.length; idxR++){
		for(let idxV = 0; idxV < partialSudoku[idxR].length; idxV++){
			if(partialSudoku[idxR][idxV] === 0){
				return {x: idxR, y: idxV}
			}
		}
	}
}

function addNumberToPartialSolution(number, partialSudoku){
	const {x, y} = findNextFreePosition(partialSudoku)
	console.log(x,y)
	partialSudoku[x][y] = number
	console.log(partialSudoku)
	return { partialSudoku, x, y }
}

function revertSudoku({partialSudoku, x, y}){
	partialSudoku[x][y] = 0
	return partialSudoku
}

function isValidValue(number){
	return number > 0
}

function isQuadrantWithDuplicates({partialSudoku, x, y}) {
	const alreadyAdded = []
	let startX = Math.floor(x / 3)
	let startY = Math.floor(y / 3)
	if(startX > 0){
		startX = startX * 3
	}
	if(startY > 0){
		startY = startY * 3
	}
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			let value = partialSudoku[startY + j][startX + i]
			if(alreadyAdded.includes(value)){
				return true
			} else {
				if(isValidValue(value)){
					alreadyAdded.push(value)
				}
			}
		}
	}
	return false
}

function isRowWithDuplicates({ partialSudoku, x, y }){
	alreadyAdded = []
	for(let i = 0; i < 6; i++){
		let value = partialSudoku[x][i]
		if(alreadyAdded.includes(value)){
			return true
		} else {
			if(isValidValue(value)){
				alreadyAdded.push(value)
			}
		}
	}
	return false
}

function isColumnWithDuplicates({ partialSudoku, x, y }){
	alreadyAdded = []
	for(let i = 0; i < 6; i++){
		let value = partialSudoku[i][y]
		if(alreadyAdded.includes(value)){
			return true
		} else {
			if(isValidValue(value)){
				alreadyAdded.push(value)
			}
		}
	}
	return false
}

function isFeasible(sudokuChanged){
	return !isQuadrantWithDuplicates(sudokuChanged) && !isRowWithDuplicates(sudokuChanged) && !isColumnWithDuplicates(sudokuChanged)
}

function solveSudoku(partialSudoku){
	if(sudokuResolved(partialSudoku)){
		return partialSudoku
	} else {
		for(let number of possibleNumbers){
			let sudokuChanged = addNumberToPartialSolution(number, partialSudoku)
			if(isFeasible(sudokuChanged)){
				return solveSudoku(sudokuChanged.partialSudoku)
			} else {
				partialSudoku = revertSudoku(sudokuChanged)
			}
		}
		return partialSudoku
	}
}

const finalSudoku = solveSudoku(example2)
console.log(finalSudoku)