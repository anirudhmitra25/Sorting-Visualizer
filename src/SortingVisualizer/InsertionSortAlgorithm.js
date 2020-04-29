export function insertionSort(array){
   const auxillaryarray = array.slice();
    const animations = [];
    isortHelper(auxillaryarray,array.length,animations);

    console.log(animations);
    array = auxillaryarray;
    return [animations, array];

}

function isortHelper(auxillaryArray,n,animations){
    for (let i = 1; i < n; i++) {
        let key = auxillaryArray[i];
        let j = i - 1;
        animations.push(["comparision1", j, i]);
        animations.push(["comparision2", j, i]);
        while(j >= 0 && auxillaryArray[j] > key) {
            animations.push(["overwrite", j + 1, auxillaryArray[j]]);
            auxillaryArray[j + 1] = auxillaryArray[j];
            j = j - 1;
            if(j >= 0) {
                animations.push(["comparision1", j, i]);
                animations.push(["comparision2", j, i]);
            }     
        }
        animations.push(["overwrite", j + 1, key]);
        auxillaryArray[j + 1] = key;
    }
}