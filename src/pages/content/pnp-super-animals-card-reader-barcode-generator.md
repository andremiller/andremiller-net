---
title: 'PnP Super Animals Card Reader Barcode Generator'
description: 'PnP Super Animals Card Reader Barcode Generator'
pubDate: '2016-08-13'
image: '/images/pnp_super_animals_card_reader.jpg'
categories: ['Uncategorized']

---

In this article I attempt to decode the barcode used for PnP’s “Super
Animals” cards. It was done mainly as a learning exercise, and to play
some sounds for my 2 year old son with the scanner. Scroll down to the
bottom if you’re only interested in the generator.

EDIT 2017-04-25: Just a quick note, this generator also works for the
newly launched ‘South African Super Animals’ campaign, you just have to
add 108 to the card number.

Pick n Pay recently launched a “Super Animals” campaign. When you spend
a certain amount of money, you are awarded cards. Each card has a
picture of an animal on one side and a barcode on the other. They also
sell card reader that plays the sound the animal makes when you scan the
card. There is also a phone app that scans the front of the card, but
this post is only about the barcode and barcode scanner.

Here is a photo of the card reader, with a card in the scanning slot. On
the front of the card there is also a number. This card, “Koala” is card
number 19:

![image](/images/pnp_super_animals_card_reader.jpg)

The back of the card, showing the barcode:

![image](/images/pnp_super_animals_card.jpg)

The barcode has 13 lines, each representing one bit. A thin line is “0”,
and thick line is “1”. Let’s assume the bottom of the card represents
the first bit, since that is the first line scanned.

I compared quite a few cards and noticed the following:

1.  The first two bits were always 0 (two thin lines).
2.  The third to 10th bit represented the card number in binary. For
    example, card \#19 in binary is 00010011.
3.  The 11th and 12th bit was always one of two combinations, it was
    either “10” or “01” (thick, thin or thin, thick).
4.  The last bit was always 1 (one thick line).

After comparing a few more cards I saw another pattern. Bit 11 and 12’s
pattern (either “10” or “01”) corresponded to the number of bits set in
the binary representation of the card number. If the number of bits that
were set were odd, then bits 11 and 12 was set to “10”. If the number of
bits set were even, then bits 11 and 12 was set to “01”.

So using the card in the photo above (card \#19), the card number in
binary (“00010011”) contains an odd number of bits (3), so bits 11 and
12 is set to “10”.

Now we know the purpose of each of the bits in the barcode:

| Bits  | Purpose                                             |
|-------|-----------------------------------------------------|
| 1-2   | Start bits, always 00                               |
| 3-10  | 8 bit card number, most significant bit (MSB) first |
| 11-12 | Two bit checksum.                                   |
| 10    | if number of bits in card number is odd.            |
| 01    | if number of bits in card number if even            |
| 13    | Stop bit, always 1                                  |

# Barcode Generator

And finally, we can use this information to create a barcode for any
card number (browser needs JavaScript enabled, only tested on Chrome):
Note: To generate barcodes for the second set, “South African Super
Animals” just add 108 to the card number.

<script src="/projects/pnp_barcode_generator/jquery.min.js"></script></p>
<table>
<tbody>
<tr>
<td><input id="card_number" type="number" value="19"></td>
<td><button id="setBarCode">Generate Barcode</button></td>
</tr>
<tr>
<td colspan="2"><canvas id="canvas" width="300" height="120"></canvas><br />
<button id="printCard">Print</button></td>
</tr>
</tbody>
</table>
<p><script src="/projects/pnp_barcode_generator/super_animals_barcode_generator.js"></script></p>

If you print it on normal paper you can fold the paper in half to make
it a bit sturdier to scan.

# Print

![image](/images/super_animals_print_1r.jpg)

# Fold

![image](/images/super_animals_print_2r.jpg)

# Scan

![image](/images/super_animals_print_3r.jpg)
