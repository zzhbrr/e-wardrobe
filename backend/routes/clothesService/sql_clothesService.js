function getOutfitsByUID(uid) {
    return `SELECT * FROM admin.outfit WHERE uid = '${uid}'`;
}

function getOutfitsByOID(oid) {
    return `SELECT * FROM admin.outfit WHERE oid = ${oid}`;
}

function getProductURLByPID(pid) {
    return `SELECT img_src FROM admin.product WHERE pid = ${pid}`;
}

function getProductsIDByUID(uid) {
    return `SELECT pid, img_src, type p_type 
            FROM admin.product NATURAL JOIN admin.user_prod 
            WHERE uid = '${uid};'`;
}

module.exports = {
    getOutfitsByUID: getOutfitsByUID,
    getOutfitsByOID: getOutfitsByOID, 
    getProductURLByPID: getProductURLByPID, 
    getProductsIDByUID: getProductsIDByUID
}