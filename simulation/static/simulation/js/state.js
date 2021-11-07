/* state.js - some functions to manage the state of the game
 */

// nextState - given an input of a Dict containing points that are currently alive
// return the next state of the game
// points are considered to be on a square grid similar to an xy-plane
// with squares each of size 1 (1x1)
// meaning 2 points are considered neighbors if they are 1 away from each other
//
// state is a dict, whose keys are the x-coords and vals are a set of y-coords
function nextState(state) {
    // iterate through the points in state
    // generate neighbors and check how many neighbors are also alive
    // from there decide whether the point stays alive afterwards
    const newState = {};
    const deadPointsAliveNeighborsCount = {};

    for (let x in state) {
        state[x].forEach((y) => {
            // explicitly converting x since x is stored as a string in the dict's key
            const point = [Number(x), y];

            const neighbors = generateNeighbors(point);
            let aliveNeighborCount = 0;

            neighbors.forEach((neighbor) => {
                const [nx, ny] = neighbor;
                if (nx in state) {
                    if (state[nx].has(ny)) {
                        // early return on a neighbor that's alive
                        aliveNeighborCount += 1;
                        return;
                    };
                };

                // if a neighbor is dead, we record it in deadPointsAliveNeighborsCount
                // we increment the number of alive neighbors it has by 1
                // being the original point we called generateNeighbors on
                if (!(nx in deadPointsAliveNeighborsCount)) {
                    deadPointsAliveNeighborsCount[nx] = {};
                }
                if (!(ny in deadPointsAliveNeighborsCount[nx])) {
                    deadPointsAliveNeighborsCount[nx][ny] = 0;
                }
                deadPointsAliveNeighborsCount[nx][ny] += 1;
            });

            // add the point to newState if it has 2 or 3 alive neighbors
            // meaning this point is still alive
            if (aliveNeighborCount == 2 || aliveNeighborCount == 3) {
                if (!(x in newState)) {
                    newState[x] = new Set();
                };
                newState[x].add(y);
            };
        });
    };

    // iterate over deadPointsAliveNeighborsCount
    // if any point has exactly 3 alive neighbors add it to newState
    for (let x in deadPointsAliveNeighborsCount) {
        for (let y in deadPointsAliveNeighborsCount[x]) {
            if (deadPointsAliveNeighborsCount[x][y] === 3) {
                if (!(x in newState)) {
                    newState[x] = new Set();
                };
                newState[x].add(Number(y));
            };
        };
    };

    return newState;
};

// generateNeighbors - given a point, generate the 8 points neighboring it
// the points are returned as a list
// point is represented as a list containing 2 values, its x-coord and y-coord
function generateNeighbors(point) {
    const [x, y] = point
    return [[x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
            [x, y - 1], [x, y + 1],
            [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]]
};

// convertPointsArrayToDict - given an array of points, convert it to the dictionary representation
function convertPointsArrayToDict(arr) {
    const out = {};

    arr.forEach((point) => {
        [x, y] = point;
        if (!(x in out)) {
            out[x] = new Set();
        };
        out[x].add(y);
    });

    return out;
}

// convertPointsDictToArray - given a dict repr. of points, convert it to an array
function convertPointsDictToArray(dict) {
    const out = [];

    for (let x in dict) {
        dict[x].forEach((y) => {
            out.push([Number(x), y]);
        });
    };

    return out;
}

// at least it's working on the glider
let state = convertPointsArrayToDict([[1,0], [2,1], [0,2], [1,2], [2,2]]);

for (let i = 0; i < 10; i++) {
    console.log(state);
    state = nextState(state);
};