export function Qsort(array){
    const animations = [];
    const auxillaryarray = array.slice();

    quickSort(auxillaryarray,0,array.length-1,animations);

    return animations;

    //console.log(animations);
    
}

function quickSort(auxillaryarray,startIndex,endIndex,animations){

    let pivotIndex;

    if(startIndex<endIndex){

        pivotIndex = partition(auxillaryarray,startIndex,endIndex,animations);
        quickSort(auxillaryarray,startIndex,pivotIndex-1,animations);
        quickSort(auxillaryarray,pivotIndex+1,endIndex,animations);

    }

}

function partition(auxillaryarray,startIndex,endIndex,animations){

    let pivot = auxillaryarray[endIndex];
    let pivotIndex = startIndex;

    for(let i=startIndex;i<=endIndex-1;i++){

        animations.push([i,endIndex]);
        animations.push([i,endIndex]);

        if(auxillaryarray[i]<=pivot){
            animations.push([i,auxillaryarray[pivotIndex]]);
            animations.push([pivotIndex,auxillaryarray[i]]);
            swap(auxillaryarray,i,pivotIndex);
            pivotIndex++;

        }

        else{

            animations.push([-1,-1]);
            animations.push([-1,-1]);

        }

        animations.push([-1,-1]);
        animations.push([-1,-1]);

    }

    animations.push([-1,-1]);
    animations.push([-1,-1]);
    animations.push([-1,-1]);
    animations.push([-1,-1]);

    animations.push([pivotIndex,auxillaryarray[endIndex]]);
    animations.push([endIndex,auxillaryarray[pivotIndex]]);


    swap(auxillaryarray,pivotIndex,endIndex);


    return pivotIndex;


}

function swap(items, firstIndex, secondIndex){
  

    let temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;


}


