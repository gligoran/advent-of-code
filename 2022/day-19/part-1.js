const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const blueprints = rawInput
  .split('\n')
  .filter((b) => !!b)
  .map((rawBlueprint) => {
    const [name, rawPlans] = rawBlueprint.split(': ');
    const id = parseInt(name.split(' ')[1], 10);

    const [rawOrePlan, rawClayPlan, rawObsidianPlan, rawGeodePlan] =
      rawPlans.split('. ');

    const orePlan = {
      ore: parseInt(rawOrePlan.split(' ')[4], 10),
    };

    const clayPlan = {
      ore: parseInt(rawClayPlan.split(' ')[4], 10),
    };

    const obsidianPlan = {
      ore: parseInt(rawObsidianPlan.split(' ')[4], 10),
      clay: parseInt(rawObsidianPlan.split(' ')[7], 10),
    };

    const geodePlan = {
      ore: parseInt(rawGeodePlan.split(' ')[4], 10),
      obsidian: parseInt(rawGeodePlan.split(' ')[7], 10),
    };

    return {
      id,
      plans: {
        ore: orePlan,
        clay: clayPlan,
        obsidian: obsidianPlan,
        geode: geodePlan,
      },
      minute: 0,
      robots: {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
      resources: {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
    };
  });

const MAX_MINUTE = 24;

const calcBlueprintQualityLevel = (blueprint) => {
  const { id, plans, ...firstBlueprint } = blueprint;

  const maxResourcesNeeded = Object.keys(plans).reduce((agg, plan) => {
    Object.entries(plans[plan]).forEach(([key, value]) => {
      agg[key] = Math.max(value, agg?.[key] || 0);
    });
    return agg;
  }, {});

  let nextBlueprints = [firstBlueprint];
  let maxGeodes = 0;

  while (nextBlueprints.length) {
    const currentBlueprint = nextBlueprints.shift();

    const newBlueprints = Object.keys(plans)
      .filter(
        (plan) =>
          plan === 'geode' ||
          currentBlueprint.robots[plan] *
            (MAX_MINUTE - currentBlueprint.minute) +
            currentBlueprint.resources[plan] <
            maxResourcesNeeded[plan] * (MAX_MINUTE - currentBlueprint.minute),
      )
      .filter((plan) =>
        Object.keys(plans[plan]).every(
          (resource) => currentBlueprint.robots[resource] > 0,
        ),
      )
      .map((plan) => {
        const durations = Object.fromEntries(
          Object.entries(plans[plan]).map(([resource, quantity]) => {
            const dur =
              Math.ceil(
                (quantity - currentBlueprint.resources[resource]) /
                  currentBlueprint.robots[resource],
              ) + 1;

            return [resource, dur];
          }),
        );

        const duration = Math.max(1, ...Object.values(durations));

        return { plan, duration };
      })
      .filter(
        ({ duration }) => currentBlueprint.minute + duration <= MAX_MINUTE,
      )
      .map(({ plan, duration }) => {
        const resources = { ...currentBlueprint.resources };
        Object.keys(resources).forEach((resource) => {
          resources[resource] =
            resources[resource] +
            currentBlueprint.robots[resource] * duration -
            (plans[plan][resource] || 0);
        });

        return {
          minute: currentBlueprint.minute + duration,
          robots: {
            ...currentBlueprint.robots,
            [plan]: currentBlueprint.robots[plan] + 1,
          },
          resources,
        };
      });

    nextBlueprints.push(...newBlueprints);

    if (currentBlueprint.robots.geode > 0) {
      const duration = MAX_MINUTE - currentBlueprint.minute;

      const resources = { ...currentBlueprint.resources };
      Object.keys(resources).forEach((resource) => {
        resources[resource] += currentBlueprint.robots[resource] * duration;
      });

      maxGeodes = Math.max(maxGeodes, resources.geode);
    }
  }

  return maxGeodes * id;
};

const qualityLevels = blueprints.map((blueprint) =>
  calcBlueprintQualityLevel(blueprint),
);

const sum = qualityLevels.reduce((s, ql) => s + ql, 0);

console.log(sum);
