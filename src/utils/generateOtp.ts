export default function generateOtp(n: number){
    let num = '';
    while(n > 0){
        const randNum = Math.floor(Math.random() * 10)
        num += randNum;
        n--;
    }
    return num;
    
}


