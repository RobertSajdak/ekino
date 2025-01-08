export function getNameInitials(name: string) {
    const nameArr = name.split(' ');

    let nameInitials = nameArr[0][0] + nameArr[0][1];

    if(nameArr.length > 1) {
        nameInitials = nameArr[0][0] + nameArr[1][0];
    }

    return nameInitials.toUpperCase();
}
