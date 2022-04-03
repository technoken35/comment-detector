import express, {Request, Response, NextFunction, Application} from "express";

const app:Application = express()
const port:number = 3000

app.get('/', (request: Request, response: Response) => {
    response.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function sum (num1:number, num2:number){
    return num1 + num2;
}
console.log(sum(8,4))