let divanpf = false;


register('command', () => {
    divanpf = !divanpf;
    ChatLib.chat(`§7[Divan PF] ${divanpf ? "§aEnabled" : "§cDisabled"}§b.`);
}).setName("divan")


const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow")
const sendWindowClick = (windowId, slot, clickType, actionNumber = 0) => Client.sendPacket(new C0EPacketClickWindow(windowId ?? Player.getContainer().getWindowId(), slot, clickType ?? 0, 0, null, actionNumber))

register("step", () => {
    if (divanpf == true) {
        let containerName = Player.getContainer().getName()
        //console.log(containerName)
        if (Player.getContainer().getName().includes('Auctions: "Divan"')) {
            for (let i = 11; i <= 43; i++) {
                let price = 0;
                let actualItem = Player.getContainer().getItems()[i];
                let assignedprice = 0
                let m = 1000000
                if (actualItem == undefined || actualItem == null)
                    continue;
                let itemName = actualItem?.getName().removeFormatting()
                if (itemName.includes("Divan")) {
                    if (itemName.includes("Helmet Of Divan")) {
                        assignedprice = assignedprice + (27 * m)
                    }
                    if (itemName.includes("Chestplate Of Divan")) {
                        assignedprice = assignedprice + (31 * m)
                    }
                    if (itemName.includes("Leggings Of Divan")) {
                        assignedprice = assignedprice + (31 * m)
                    }
                    if (itemName.includes("Boots Of Divan")) {
                        assignedprice = assignedprice + (25 * m)
                    }
                    if (actualItem.getNBT().toObject()["tag"]["ExtraAttributes"] != undefined) {
                        let nbt = actualItem.getNBT().toObject();
                        let items = nbt.tag?.ExtraAttributes?.gems
                        if (items != null || items != undefined) {
                            items = JSON.stringify(items)
                            let flawlessGems = items.match(/FLAWLESS/g)
                            if (flawlessGems != null) {
                                let flawlessGemsLength = flawlessGems.length
                                assignedprice = assignedprice + (1.5 * m * flawlessGemsLength)
                            }
                            let perfectGems = items.match(/PERFECT/g)
                            if (perfectGems != null) {
                                let perfectGemsLength = perfectGems.length
                                assignedprice = assignedprice + (9.5 * m * perfectGemsLength)
                            }
                            let numberOfSlots = nbt.tag?.ExtraAttributes?.gems?.unlocked_slots;
                            if (numberOfSlots != null) {
                                let numberOfSlotsLength = numberOfSlots.length;
                                assignedprice = assignedprice + (5 * m * numberOfSlotsLength)
                            }
                        }
                    }
                    if (itemName.includes("Jaded")) {
                        assignedprice = assignedprice + (5 * m)
                    }
                    Player.getContainer().getItems()[i]?.getLore()?.forEach(line => {
                        if (ChatLib.removeFormatting(line)?.startsWith("Buy it now:")) {
                            var hype = ChatLib.removeFormatting(line).replace("Buy it now: ", "");
                            price = hype.replaceAll(",", "");
                            price = price.replace(" coins", "");
                            price = parseInt(price);
                        }
                    })
                    if (price <= assignedprice) {
                        let profitPercentage = ((assignedprice / price) * 100)
                        let profit = assignedprice - price
                        profitPercentage = parseFloat(profitPercentage).toFixed(2)
                        if (profitPercentage >= 105) {
                            profitPercentage = profitPercentage + "%"
                            console.log(profitPercentage + " for " + price)
                        }
                    }
                    //console.log(itemName + " ending " + assignedprice + " " + i)
                    if (price <= (.95 * assignedprice) && profit >= (4 * m) && price != 0 && assignedprice != 0) {
                        //console.log("Divan found for: " + price + "when assigned price is " + assignedprice)
                        Player.getContainer().click(i, false, "MIDDLE");
                    }
                }
            }
            page();
        }
    }
}).setFps(2)

function page() {
    inv = Player.getContainer()
    invName = inv.getName()
    if (invName === 'Auctions Browser' || invName === 'Auctions: "Divan"') {
        if (inv.getItems()[53]?.getID() === 262) {
            sendWindowClick(inv.getWindowId(), 53, 0)
        }
        if (inv.getItems()[53]?.getID() === 160) {
            sendWindowClick(inv.getWindowId(), 46, 1)
        }
    }
}

register("Step", () => {
    if (divanpf === true) {
        if (Player.getContainer().getName() === ("Auction House") || Player.getContainer().getName() === ("Co-op Auction House")) {
            Player.getContainer().click(11, false, "MIDDLE");
        }
        if (!Player.getContainer() === null) return;
        if (Player.getContainer().getName().includes("container")) {
            ChatLib.say("/ah");
        }
    }
}).setDelay(1)