# Wounds & Recovery
<!--{ "parent": "conflict", "order": 4 }-->

*One-pager. Injury and fatigue are tracked as **levels**, like everything fragile in this game. Two tables tell the story: **Impact** (what a wound does to you now) and **Recovery** (the much slower business of getting better). Toughness rolls — resisting pain and convalescence — are made on **Endurance *or* Willpower** (the player's choice: some people are physically tough, some just refuse to quit). Pain resistance and stamina are **not skills** — you roll the raw attribute.*

## Impact — what a wound does now

Injury is a single number, **0 (healthy)** to **8 (dead)**. The level is a **−(level)** modifier to *everything* you do.

| Lvl | State | Right now |
|---|---|---|
| 0 | Healthy | — |
| 1 | Light | −1 to all activity |
| 2 | Medium | −2 |
| 3 | Heavy | −3 |
| 4 | Incapacitated | −4; roll (EN/WP) each combat turn to act at all, and lose an action |
| 5 | Critical | −5; roll each turn to stay conscious |
| 6 | Dying | Unconscious |
| 7 | Near death | Unconscious |
| 8+ | Dead | — |

New damage **adds to the current level** (medium 2 + heavy 3 = critical 5). *Optional Accumulation:* head/chest/abdomen add in full; a limb adds its level **−2** (min 0), or replaces the current level if higher.

## Pain, Shaken & Stun

Damage doesn't only wound — it rattles. Whenever a character is hit hard enough to matter, they make a **pain-resistance roll — EN or WP**:

- **Shrug it off** (good roll) — carry on.
- **Shaken** (ordinary outcome) — −2 to everything and limited to a single action; at the end of each turn, roll EN/WP to clear it.
- **Stunned** (poor roll, or any **Stun-class "S" weapon**, which skips the save) — no action but to try to **recover from stun** (another EN/WP roll) each turn. A QR1 recovery clears it instantly; a QR10 drops you unconscious.

Shaken is "off-balance and hurting"; Stunned is "out of the fight until you pull yourself together." Both are temporary and leave no lasting level.

## Recovery — convalescence

Healing is slow. At the interval for your level, make a **convalescence roll** (EN or WP) to **improve or worsen**:

| Lvl | Roll every | Result |
|---|---|---|
| 1 Light | day | success drops a level; QR10 raises one |
| 2 Medium | 5 days | " |
| 3 Heavy | 20 days | " |
| 4 Incapacitated | day | " |
| 5 Critical | 30 min | QR3 drops, QR7 raises, QR10 raises + unconscious |
| 6 Dying | 5 min | " (deterioration) |
| 7 Near death | minute | " (deterioration) |

Convalescence rolls carry a penalty equal to the **worst level you've sunk to** since last healthy — until you fully recover or get **medical care**. Care (closing wounds, transfusions, surgery) lowers that worst-level penalty or directly buys back levels; it's what hauls a dying character back from the edge.

## Fatigue — exhaustion levels

Hard exertion (a sustained sprint, a long mêlée, a forced march, harsh exposure) calls for an **EN/WP check**; failure adds a level of **exhaustion**, with the magnitude of effort as a modifier rather than extra rolls.

**How exhaustion penalizes activity.** Unlike a wound — which is −(level) to *everything*, because pain and blood loss don't care what you're doing — exhaustion is domain-weighted. Each exhaustion track is a **full** negative modifier to activity that uses *that* pool, and **half** to everything else; different tracks **stack** (and stack on top of any wound penalty). Add the contributions, then round (half away from zero).

> *A wizard is at −3 fatigue (a forced march) and −3 mana (a duel). Physical activity: −3 (fatigue, full) + half of −3 mana (−1.5) = **−5**. Casting: −3 mana + half of −3 fatigue = **−5**. Seducing the apprentice (neither physical nor magical): half of each = −1.5 − 1.5 = **−3**.*

Unlike wounds, exhaustion clears by **rest, not rolls** — but you clear **one level at a time**, and the deeper the level, the more rest it takes to shift:

| Clearing a level at depth… | …takes |
|---|---|
| 1 | A 15-minute breather |
| 2 | A long break (an hour+) |
| 3 | A good night's sleep |
| 4 | Unconsciousness / near-coma |
| 5+ | Special intervention |

So a character at −3 gets a good night's sleep and comes back to −2; clearing that level then wants a long break, and the last a breather. Deep exhaustion is a slow climb out. At four or more levels, keep checking EN/WP or exhaustion begins converting into actual wounds — you can collapse, or die of exposure. Mana, piety, and other powers run identical exhaustion tracks driven by *gathering*, not exertion — see **Power Pools**.

*Designer's Note: the stamina-point pool is gone. A check you can't fudge beats a pool everyone quietly forgets to subtract from — and letting toughness be EN* or *WP means the stoic and the stubborn are both survivors, by different routes.*
