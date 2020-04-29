
export function BSort(inputArr){
    const animations = [];

    const auxiliary_array = inputArr.slice();

    BSortHelper(inputArr, auxiliary_array, animations);

    return animations;

}

function BSortHelper(inputArr, auxillary_arry, animations){

  let len = inputArr.length;
  let k=0;

  for(let i=0;i<len-1;i++){
    for (let j = 0; j < len-i-1; j++) {

        animations.push([j,j+1]);
        animations.push([j,j+1]);

        if (inputArr[j] > inputArr[j + 1]) {

            animations.push([j,inputArr[j+1]]);
            animations.push([j+1,inputArr[j]]);

            let tmp = inputArr[j];
            inputArr[j] = inputArr[j + 1];
            inputArr[j + 1] = tmp;
        }    
            else{

              animations.push([-1,-1]);
              animations.push([-1,-1]);

            }
        
    
}
}

return animations;


}