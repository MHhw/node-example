function test1(req, res){
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    const response = { message: 'test1' };
    res.end(JSON.stringify(response));
}

function test2(req, res){
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    const response = { message: 'test2' };
    res.end(JSON.stringify(response));
}

export { test1, test2 };