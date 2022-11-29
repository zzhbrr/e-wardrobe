function getOutfitsByUID(uid) {
    return `SELECT * FROM admin.outfit WHERE uid = '${uid}'`;
}

function getOutfitsByOID(oid) {
    return `SELECT * FROM admin.outfit WHERE oid = ${oid}`;
}

function getProductURLByPID(pid) {
    return `SELECT img_src FROM admin.product WHERE pid = ${pid}`;
}

module.exports = {
    getOutfitsByUID: getOutfitsByUID,
    getOutfitsByOID: getOutfitsByOID, 
    getProductURLByPID: getProductURLByPID
}