let divanpf = false;


register('command', () => {
    divanpf = !divanpf; 
    ChatLib.chat(`§7[Divan PF] ${divanpf ? "§aEnabled" : "§cDisabled"}§b.`);
}).setName("divan")


const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow")
const sendWindowClick = (windowId, slot, clickType, actionNumber = 0) => Client.sendPacket(new C0EPacketClickWindow(windowId ?? Player.getContainer().getWindowId(), slot, clickType ?? 0, 0, null, actionNumber))
const Base64 = java.util.Base64

register("step", () => {
    if (divanpf == true) {
        const containerName = Player.getContainer().getName()
        //console.log(containerName)
        if (containerName.includes('Auctions: "Divan"')) {
            /*
            const divan = Player.getContainer().getItems()[22]?.getNBT()
            let a = Base64.getEncoder().encodeToString(new java.lang.String(divan).getBytes())
            console.log(a)
            */
            for (let i = 11; i <= 43; i++) {
                const price = 0;
                const actualItem = Player.getContainer().getItems()[i];
                let assignedprice = 0
                const m = 1000000
                if (actualItem == undefined || actualItem == null)
                    continue;
                const itemName = actualItem?.getName().removeFormatting()
                if (itemName.includes("Divan")) {
                    if (itemName.includes("Helmet Of Divan")) {
                        assignedprice = assignedprice + (27 * m)
                    }
                    if (itemName.includes("Chestplate Of Divan")) {
                        assignedprice = assignedprice + (31 * m)
                    }
                    if (itemName.includes("Leggings Of Divan")) {
                        assignedprice = assignedprice + (29 * m)
                    }
                    if (itemName.includes("Boots Of Divan")) {
                        assignedprice = assignedprice + (25 * m)
                    }
                    if (actualItem.getNBT().toObject()["tag"]["ExtraAttributes"] != undefined) {
                        const nbt = actualItem.getNBT().toObject();
                        const items = JSON.stringify(nbt.tag?.ExtraAttributes?.gems)
                        if (items != null || items != undefined) {
                            const flawlessGems = items.match(/FLAWLESS/g)
                            if (flawlessGems != null) {
                                assignedprice = assignedprice + (1.5 * m * flawlessGems.length)
                            }
                            const perfectGems = items.match(/PERFECT/g)
                            if (perfectGems != null) {
                                assignedprice = assignedprice + (9.5 * m * perfectGems.length)
                            }
                            const numberOfSlots = nbt.tag?.ExtraAttributes?.gems?.unlocked_slots;
                            if (numberOfSlots != null) {
                                assignedprice = assignedprice + (5 * m * numberOfSlots.length)
                            }
                            if (actualItem.getNBT().toObject()["tag"]["ExtraAttributes"]["rarity_upgrades"] == 1) {
                                assignedprice = assignedprice + (5 * m)
                            }
                        }
                    }
                    if (itemName.includes("Jaded")) {
                        assignedprice = assignedprice + (5 * m)
                    }
                    actualItem.getLore()?.forEach(line => {
                        if (ChatLib.removeFormatting(line)?.startsWith("Buy it now:")) {
                            price = parseInt(ChatLib.removeFormatting(line).replace(/Buy it now: |,| coins/g, ""))
                        }
                    })
                    const profit = assignedprice - price
                    if (price <= (.9 * assignedprice) && profit >= (4 * m) && price != 0 && assignedprice != 0) {
                        console.log("Divan found for: " + price + "when assigned price is " + assignedprice)
                        Player.getContainer().click(i, false, "MIDDLE");
                    }
                }
            }
            page();
        }
    }
}).setFps(1)

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
        if (Player.getContainer().getName().includes("Auction House")) {
            Player.getContainer().click(11, false, "MIDDLE");
        }
        else if (Player.getContainer()?.getName()?.includes("container")) {
            ChatLib.say("/ah");
        }
    }
}).setDelay(1)
